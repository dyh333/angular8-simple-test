import { Component, OnInit, ViewChild, Input } from '@angular/core';
import Vis from 'vis';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('wrapper', { static: true }) wrapper;
  @ViewChild('tooltips', { static: true }) tooltips;
  NODE_ID = 0;
  getRelationRequestId = null;
  fullScreen = false;
  network = null;
  nodes = [];
  edges = [];
  legends = [];
  hoverNode = null;
  hoverTimer = null;
  rootNode = null;
  options = {
    physics: false,
    interaction: {
      dragNodes: false,
      hover: true
    },
    edges: {
      color: {
        color: '#c3cdd7',
        highlight: '#c3cdd7',
        hover: '#c3cdd7'
      },
      smooth: {
        enabled: false
      },
      arrows: 'middle'
    },
    nodes: {
      shape: 'image',
      font: {
        color: '#737987',
        size: 16,
        vadjust: -5
      },
      scaling: {
        min: 15,
        max: 25
      },
      widthConstraint: {
        maximum: 200
      }
    },
    layout: {
      hierarchical: {
        direction: 'LR',
        nodeSpacing: 90
      }
    }
  };
  ignore = ['plat'];
  details = {
    show: false,
    title: '',
    objId: null,
    instId: null
  };

  ngOnInit() {
    // const data = [
    //   { id: 1, content: 'item 1', start: '2013-04-20' },
    //   { id: 2, content: 'item 2', start: '2013-04-14' },
    //   { id: 3, content: 'item 3', start: '2013-04-18' },
    //   { id: 4, content: 'item 4', start: '2013-04-16', end: '2013-04-19' },
    //   { id: 5, content: 'item 5', start: '2013-04-25' },
    //   { id: 6, content: 'item 6', start: '2013-04-27' }
    // ];
    // const options = {};
    // const timeline = new Vis.Timeline(
    //   this.wrapper.nativeElement,
    //   data,
    //   options
    // );

    this.getRelation('objId', 'bk_inst_id').then(res => {
      const [rootData] = res;

      // const validRelation = rootData.next.filter(
      //   next => !this.ignore.includes(next.bk_obj_id)
      // );
    });
  }

  resetNetwork(node = null) {
    this.network && this.network.destroy();
    this.network = new Vis.Network(
      this.wrapper.nativeElement,
      {
        nodes: new Vis.DataSet(this.nodes),
        edges: new Vis.DataSet(this.edges)
      },
      this.options
    );
    this.network.on('selectNode', data => {
      this.handleSelectNode(data.nodes[0]);
    });
    this.network.on('hoverNode', data => {
      this.handleHoverNode(data);
    });
    this.network.on('blurNode', data => {
      this.handleBlurNode(data);
    });
    this.network.on('dragStart', data => {
      this.handleDragStart(data);
    });
    node = node || this.nodes[0];
    this.network.focus(node.id, { scale: 0.8 });
    this.network.selectNodes([node.id]);

    this.legends = node.legends;
  }

  async getRelation(objId, instId, node = null) {
    const data = [
      {
        prev: [
          {
            id: '',
            bk_obj_id: 'bk_tomcat',
            bk_obj_icon: 'icon-cc-tomcat',
            bk_inst_id: 0,
            bk_obj_name: 'tomcat',
            bk_inst_name: '',
            asso_id: 0,
            count: 1,
            children: [
              {
                id: '6',
                bk_obj_id: 'bk_tomcat',
                bk_obj_icon: 'icon-cc-tomcat',
                bk_inst_id: 6,
                bk_obj_name: 'tomcat',
                bk_inst_name: '是的发送到发',
                asso_id: 6
              }
            ]
          }
        ],
        next: [
          {
            id: '',
            bk_obj_id: 'bk_apache',
            bk_obj_icon: 'icon-cc-apache',
            bk_inst_id: 0,
            bk_obj_name: 'apache',
            bk_inst_name: '',
            asso_id: 0,
            count: 2,
            children: [
              {
                id: '4',
                bk_obj_id: 'bk_apache',
                bk_obj_icon: 'icon-cc-apache',
                bk_inst_id: 4,
                bk_obj_name: 'apache',
                bk_inst_name: '123123',
                asso_id: 7
              },
              {
                id: '5',
                bk_obj_id: 'bk_apache',
                bk_obj_icon: 'icon-cc-apache',
                bk_inst_id: 5,
                bk_obj_name: 'apache',
                bk_inst_name: '阿斯顿发多少',
                asso_id: 9
              }
            ]
          }
        ],
        curr: {
          id: '2',
          bk_obj_id: 'bk_weblogic',
          bk_obj_icon: 'icon-cc-weblogic',
          bk_inst_id: 2,
          bk_obj_name: 'weblogic',
          bk_inst_name: '得到的',
          asso_id: 0
        }
      }
    ];

    this.legends = [];
    await this.updateNetwork(data[0], node);
    this.resetNetwork(node);
    return data;
  }

  async updateNetwork({ curr, next, prev }, node: any = null) {
    node = node || (await this.createRootNode(curr));

    node.next = node.next || [];
    node.prev = node.prev || [];
    const [nextData, prevData] = await Promise.all([
      this.createRelationData(next, node, 'next'),
      this.createRelationData(prev, node, 'prev')
    ]);
    node.next = [...node.next, ...nextData.nodes];
    node.prev = [...node.prev, ...prevData.nodes];
    const allLegends = [...nextData.legends, ...prevData.legends];
    const uniqueLegends = [];
    allLegends.forEach(legend => {
      const uniqueLegend = uniqueLegends.find(
        uniqueLegend => uniqueLegend.id === legend.id
      );
      if (uniqueLegend) {
        uniqueLegend.count += legend.count;
      } else {
        uniqueLegends.push(legend);
      }
    });
    node.legends = uniqueLegends;
  }

  async createRootNode(root) {
    const node = {
      id: `${root.bk_obj_id}_${root.bk_inst_id}_${this.NODE_ID++}`,
      label: root.bk_inst_name,
      data: root,
      loaded: true,
      children: [],
      level: 0,
      value: 25,
      image: null,
      shape: null
    };
    root._id = node.id;
    try {
      const image = await this.createNodeImages(root);

      console.log(image);

      node.image = image;
    } catch (e) {
      node.shape = 'dot';
    }
    this.rootNode = node;
    this.nodes.push(node);
    return node;
  }

  async createRelationData(relation, currentNode, type) {
    const relationNodes = [];
    const relationEdges = [];
    const relationLegends = [];
    for (let i = 0; i < relation.length; i++) {
      const obj = relation[i];
      if (this.ignore.includes(obj.bk_obj_id) || !obj.count) {
        continue;
      }
      const children = obj.children;
      for (let j = 0; j < children.length; j++) {
        const inst = children[j];
        inst.bk_obj_id = obj.bk_obj_id;
        if (!this.exist(currentNode, inst, type)) {
          const node = {
            id: `${inst.bk_obj_id}_${inst.bk_inst_id}_${this.NODE_ID++}`,
            label: inst.bk_inst_name,
            data: inst,
            loaded: false,
            level: this.getRelationNodeLevel(currentNode, type),
            children: [],
            [type === 'next' ? 'prev' : 'next']: [currentNode],
            [type]: [],
            legends: [],
            value: 15
          };
          inst._id = node.id;
          currentNode.children.push(node);
          const edge = {
            to: type === 'next' ? currentNode.id : node.id,
            from: type === 'next' ? node.id : currentNode.id,
            label: node.data.bk_asst_name
          };
          const legend = relationLegends.find(
            legend => legend.id === obj.bk_obj_id
          );
          if (legend) {
            legend.count++;
          } else {
            relationLegends.push({
              id: obj.bk_obj_id,
              name: obj.bk_obj_name,
              icon: obj.bk_obj_icon,
              node: currentNode,
              active: true,
              count: 1
            });
          }
          try {
            const instImages = await this.createNodeImages(inst);
            node.image = instImages;
          } catch (e) {
            node.shape = 'dot';
          }
          relationNodes.push(node);
          relationEdges.push(edge);
        }
      }
    }
    this.nodes = [...this.nodes, ...relationNodes];
    this.edges = [...this.edges, ...relationEdges];
    return {
      nodes: relationNodes,
      edges: relationEdges,
      legends: relationLegends
    };
  }

  exist(currentNode, newInst, type) {
    return currentNode[type].some(node => {
      return (
        node.data.bk_obj_id === newInst.bk_obj_id &&
        node.data.bk_inst_id === newInst.bk_inst_id
      );
    });
  }

  getRelationNodeLevel(currentNode, type) {
    if (currentNode.level === 0) {
      return type === 'next' ? currentNode.level + 1 : currentNode.level - 1;
    } else if (currentNode.level < 0) {
      return currentNode.level - 1;
    } else {
      return currentNode.level + 1;
    }
  }

  async createNodeImages(data) {
    const image = await this.loadNodeImage(data);

    const base64 = {
      selected: this.createBase64Image(image, [60, 150, 255]),
      unselected: this.createBase64Image(image, [98, 104, 127])
    };

    console.log(base64);
    return Promise.resolve(base64);
  }

  loadNodeImage(data) {
    return new Promise((resolve, reject) => {
      let useDefaultWhenError = true;
      const image = new Image();
      image.onload = () => {
        resolve(image);
      };
      image.onerror = () => {
        if (useDefaultWhenError) {
          useDefaultWhenError = false;
          image.src = `./assets/svg/cc-default.svg`;
        } else {
          reject(
            new Error(
              `Can not load object icon, object id: ${
                data.bk_obj_id
              }, object icon: ${data.bk_obj_icon}`
            )
          );
        }
      };
      image.src = `./assets/svg/${data.bk_obj_icon.substr(5)}.svg`;
    });
  }

  createBase64Image(image, rgb) {
    let canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0, image.width, image.height);
    const imageData = ctx.getImageData(0, 0, image.width, image.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i] = rgb[0];
      imageData.data[i + 1] = rgb[1];
      imageData.data[i + 2] = rgb[2];
    }
    ctx.putImageData(imageData, 0, 0);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" stroke="" xmlns:xlink="http://www.w3.org/1999/xlink" width="50" height="50">
        <rect x="" height="50" width="50" style="fill: #f9f9f9; border: none"/>
        <image width="100%" xlink:href="${canvas.toDataURL(
          'image/svg'
        )}"></image>
    </svg>`;
    canvas = null;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

  async handleSelectNode(id) {
    const node = this.nodes.find(node => node.id === id);
    if (!node.loaded) {
      this.hoverNode = null;
      const data = node.data;
      await this.getRelation(data.bk_obj_id, data.bk_inst_id, node);
      node.loaded = true;
    } else {
      this.legends = node.legends;
    }
  }

  handleHoverNode(data) {
    this.wrapper.nativeElement.style.cursor = 'pointer';
    clearTimeout(this.hoverTimer);
    this.popupTooltips(data);
  }

  handleBlurNode(data) {
    this.wrapper.nativeElement.style.cursor = 'default';
    this.hoverTimer = setTimeout(() => {
      this.hoverNode = null;
    }, 300);
  }

  handleDragStart(data) {
    this.hoverNode = null;
  }

  handleTooltipsOver() {
    clearTimeout(this.hoverTimer);
  }

  handleTooltipsLeave() {
    this.hoverTimer = setTimeout(() => {
      this.hoverNode = null;
    }, 300);
  }

  popupTooltips(data) {
    const nodeId = data.node;
    this.hoverNode = this.nodes.find(node => node.id === nodeId);

    // setTimeout(() => {
    const view = this.network.getViewPosition();
    const scale = this.network.getScale();
    const nodeBox = this.network.getBoundingBox(nodeId);
    const containerBox = this.wrapper.nativeElement.getBoundingClientRect();

    const left = containerBox.width / 2 + (nodeBox.right - view.x) * scale;
    const top = containerBox.height / 2 + (nodeBox.top - view.y) * scale;

    this.tooltips.nativeElement.style.left = left + 'px';
    this.tooltips.nativeElement.style.top = top + 'px';
    // }, 0);
  }

  handleToggleNodeVisibility(legend) {
    ['prev', 'next'].forEach(type => {
      legend.node[type].forEach(node => {
        const nodeLevel = legend.node.level;
        const level =
          nodeLevel === 0
            ? [-1, 1]
            : [nodeLevel > 0 ? nodeLevel + 1 : nodeLevel - 1];
        if (level.includes(node.level) && node.data.bk_obj_id === legend.id) {
          node.hidden = legend.active;
        }
      });
    });
    legend.active = !legend.active;
    this.resetNetwork(legend.node);
  }

  handleShowDetails() {
    const nodeData = this.hoverNode.data;
    this.details.objId = nodeData.bk_obj_id;
    this.details.instId = nodeData.bk_inst_id;
    this.details.title = `${nodeData.bk_obj_name}-${nodeData.bk_inst_name}`;
    this.details.show = true;
  }

  toggleFullScreen(fullScreen) {
    // this.fullScreen = fullScreen;
    // this.$nextTick(() => {
    //   this.network.redraw();
    //   this.network.moveTo({ scale: 0.8 });
    // });
  }
}
