import { Component, OnInit } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Client, Message, over, StompSubscription } from '@stomp/stompjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  stompClient = null;
  // gateway网关的地址
  host = 'http://10.139.8.172:9007';

  ngOnInit(): void {
    this.connect();
  }

  setConnected(connected) {
    // document.getElementById('connect').disabled = connected;
    // document.getElementById('disconnect').disabled = !connected;
    // document.getElementById('conversationDiv').style.visibility = connected
    //   ? 'visible'
    //   : 'hidden';
    // $('#response').html();
  }

  connect() {
    // 地址+端点路径，构建websocket链接地址
    const socket = new SockJS(this.host + '/cluster/check');
    this.stompClient = over(socket);
    this.stompClient.connect({}, (frame) => {
      this.setConnected(true);
      console.log('Connected:' + frame);
      // 监听的路径以及回调
      this.stompClient.subscribe('/clustermonitor/checkinfo', response => {
        this.showResponse(response.body);
      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
    this.setConnected(false);
    console.log('Disconnected');
  }
  send() {
    const name = 'aaa';
    const message = 'bbb';
    // 发送消息的路径
    this.stompClient.send(
      '/request',
      {},
      JSON.stringify({ username: name, message })
    );
  }

  showResponse(message) {
    // const response = $('#response');
    // response.html(message);
    console.log(message);
  }
}
