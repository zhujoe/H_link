#!/usr/bin/python3
# -*- coding:utf-8 -*-
import paho.mqtt.client as mqtt
import json
import time
import RPi.GPIO as GPIO


def gpioInit():
    GPIO.cleanup()
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(21, GPIO.OUT)


def led(state):
    GPIO.output(21, state)


def led_2():
    for num in range(1,3):
        GPIO.output(21, 1)
        time.sleep(0.5)
        GPIO.output(21, 0)
        time.sleep(0.5)


def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))

    client.subscribe("chat")
    client.publish("chat", json.dumps({"ID": user, "say": "led is Connected!"}))


def on_message(client, userdata, msg):
    payload = json.loads(msg.payload.decode())
    ID = payload.get("ID")
    say = payload.get("say")
    print('[' + ID + ']' + say) 
    if (say >= '0') and (say <= '9'):
        if say == '0' or say == '1':
            led(int(say))
        elif say == '2':
            led_2()


if __name__ == '__main__':
    gpioInit()
    client = mqtt.Client()
    # client.username_pw_set("admin", "password")  # 必须设置，否则会返回「Connected with result code 4」
    client.on_connect = on_connect
    client.on_message = on_message

    HOST = "120.79.12.27"

    client.connect(HOST, 1883, 60)
    # client.loop_forever()

    user = "led"
    client.user_data_set(user)

    client.loop_start()

    while True:
        time.sleep(0.5)
#        s = input()
#        if s:
#            client.publish("chat", json.dumps({"ID": user, "say": s}))
