// Aボタン：前進開始
input.onButtonPressed(Button.A, function () {
    isMoving = true
})
input.onButtonPressed(Button.B, function () {
    isMoving = false
})
let distance = 0
let isMoving = false
let rightServo = AnalogPin.P13
let leftServo = AnalogPin.P14
isMoving = false
let limitdistance = 30
// 障害物を検知して自律回避
basic.forever(function () {
    if (isMoving) {
        distance = sonar.ping(
        DigitalPin.P1,
        DigitalPin.P2,
        PingUnit.Centimeters
        )
        if (distance <= limitdistance) {
            pins.servoWritePin(rightServo, 90 - 0)
            pins.servoWritePin(leftServo, 90 + 20)
            // 旋回完了を待つ
            basic.pause(1000)
        } else {
            // 右前進
            pins.servoWritePin(rightServo, 90 - 20)
            // 左停止
            pins.servoWritePin(leftServo, 90 + 20)
        }
    } else {
        pins.servoWritePin(rightServo, 90 - 0)
        pins.servoWritePin(leftServo, 90 + 0)
    }
    basic.pause(100)
})
