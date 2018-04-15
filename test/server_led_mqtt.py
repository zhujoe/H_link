# -*- coding:utf-8 -*-
import paho.mqtt.client as mqtt
import json


def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))
    client.subscribe("chat")
    client.publish("chat", json.dumps({"ID": user, "say": "Hello,anyone!"}))


def on_message(client, userdata, msg):
    payload = json.loads(msg.payload.decode())
    print(payload.get("ID")+":"+payload.get("say"))


if __name__ == '__main__':
    client = mqtt.Client()
    # client.username_pw_set("admin", "password")  # 必须设置，否则会返回「Connected with result code 4」
    client.on_connect = on_connect
    client.on_message = on_message

    HOST = "120.79.12.27"

    client.connect(HOST, 1883, 60)
    # client.loop_forever()

    user = 'server_text'
    client.user_data_set(user)

    client.loop_start()

    while True:
        s = raw_input()
        if s:
            client.publish("chat", json.dumps({"ID": user, "say": s}))

