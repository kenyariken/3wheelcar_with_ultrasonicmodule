// 停止：サーボ中立
function stopMotors () {
    pins.servoWritePin(leftServo, 90)
    pins.servoWritePin(rightServo, 90)
    isMoving = false
}
// 前進：左右サーボ前進
function goForward () {
    // 左前進
    pins.servoWritePin(leftServo, 70)
    // 右前進
    pins.servoWritePin(rightServo, 110)
    isMoving = true
}
// Aボタン：前進開始
input.onButtonPressed(Button.A, function () {
    goForward()
})
// 距離を測定（cm）
function measureDistance () {
    pins.digitalWritePin(trigPin, 0)
    basic.pause(2)
    pins.digitalWritePin(trigPin, 1)
    control.waitMicros(10)
    pins.digitalWritePin(trigPin, 0)
    let duration = pins.pulseIn(echoPin, PulseValue.High, 30000)
distance = duration * 0.034 / 2
    return distance
}
// Bボタン：停止
input.onButtonPressed(Button.B, function () {
    stopMotors()
})
// 左回転：右サーボのみ動かす
function rotateLeft () {
    // 左停止
    pins.servoWritePin(leftServo, 90)
    // 右前進
    pins.servoWritePin(rightServo, 98)
}
let distance2 = 0
let distance = 0
let isMoving = false
let rightServo = 0
let leftServo = 0
let trigPin = 0
trigPin = DigitalPin.P1
let echoPin = DigitalPin.P2
leftServo = AnalogPin.P13
rightServo = AnalogPin.P14
// 障害物を検知して自律回避
basic.forever(function () {
    if (isMoving) {
        distance2 = measureDistance()
        if (distance2 < 30) {
            rotateLeft()
        } else if (distance2 > 100) {
            // 旋回完了を待つ
            basic.pause(1000)
            goForward()
        }
    }
    basic.pause(200)
})
