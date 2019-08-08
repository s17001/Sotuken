let target = 'sigeru'

const HP = document.getElementById('HP')
const HP2 = document.getElementById('HP2')
const turn = document.getElementById('turn')
const canvas = document.getElementById('board');
const ctx = canvas.getContext("2d");
const TO_RADIANS = Math.PI / 180;
const consumptionMP = {
    attack: 10,
    move: 2
}

const movement = 100
let nowTurn = 0

const sigeru = new Image();
sigeru.src = 'sigeru.png'

const fukuoka = new Image();
fukuoka.src = "asdsd.gif";

const attacksample = new Image();
attacksample.src = 'attacksample.png'

const p1 = {
    name: 'sigeru',
    x: 0,
    y: 400,
    image: sigeru,
    direction: 0,
    HP: 100,
    MP: 100,
    commands: [],
    isPlayer: true
}

const p2 = {
    name: 'kumasan',
    x: 400,
    y: 0,
    image: fukuoka,
    direction: 0,
    HP: 100,
    MP: 100,
    commands: ["W", "W", "E", "W", "W", "E", "W", "W", "E", "W", "W"],
    isPlayer: false
};

const setTarget = targetName => targetName // この関数いる？

// function
const addList = (value) => commands => {
    commands.push(value)
    console.log(commands)
}

const makeCode = selectedTarget => {

    console.log(selectedTarget)


        let stringCode = 'async function evalfunction () {'
        selectedTarget.commands.map((command) => {
            switch (command) {
                case 'W':
                    stringCode += 'await sleep(400).then(() => {'

                    if (selectedTarget.isPlayer) {
                        stringCode += `switchTarget(moveup)('${selectedTarget.name}');});`
                    } else {
                        stringCode += `switchTarget(movedown)('${selectedTarget.name}');});`
                    }

                    break
                case 'A':
                    stringCode += 'await sleep(400).then(() => {'
                    stringCode += `switchTarget(moveleft)('${selectedTarget.name}');});`
                    break
                case 'S':

                    stringCode += 'await sleep(400).then(() => {'

                    if (selectedTarget.isPlayer) {
                        stringCode += `switchTarget(movedown)('${selectedTarget.name}');});`
                    } else {
                        stringCode += `switchTarget(moveup)('${selectedTarget.name}');});`
                    }

                    break
                case 'D':
                    stringCode += 'await sleep(400).then(() => {'
                    stringCode += `switchTarget(moveright)('${selectedTarget.name}');});`
                    break
                case 'Q':
                    stringCode += 'await sleep(400).then(() => {'
                    stringCode += `switchTarget(selectRotation,-90)('${selectedTarget.name}');switchTarget(drawRotatedImage)('${selectedTarget.name}');});`
                    break
                case 'E':
                    stringCode += 'await sleep(400).then(() => {'
                    stringCode += `switchTarget(selectRotation,90)('${selectedTarget.name}');switchTarget(drawRotatedImage)('${selectedTarget.name}');});`
                    break
                case 'F':
                    stringCode += 'await sleep(400).then(() => {'
                    stringCode += `switchTarget(attack)('${selectedTarget.name}');});`
                    break
                default:
                    console.error('親に向かって何だその値は')
            }
            stringCode += `nowTurn+=1;switchTarget(setStatusValue)('${selectedTarget.name}');`
        })
        stringCode += '};'
        console.log(stringCode + 'evalfunction()')
        return stringCode + 'evalfunction()'


}

const switchTarget = (func, sub = null) =>　target => {
    if (target === p1.name) {
        if (sub) {
            func(p1, p2)(sub)
        } else {
            func(p1, p2)
        }
    } else if (target === p2.name) {
        if (sub) {
            func(p2, p1)(sub)
        } else {
            func(p2, p1)
        }
    }
}

const sleep = (waitSec) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, waitSec);
    });
}

// FIXME 何となくターン数の描画はここじゃなくて別で切り分けて作ったほうがいい気がする
const setStatusValue = (target, target2) => {
    HP.innerText = `${target.name} : HP : ${target.HP} , MP : ${target.MP}`
    HP2.innerText = `${target2.name} : HP : ${target2.HP} , MP : ${target2.MP}`
    turn.innerText = `現在${nowTurn}ターン目です`

}

const initfunc = () => {
    ctx.drawImage(p1.image, 0, 0, 100, 100, p1.x, p1.y, 100, 100);
    ctx.drawImage(p2.image, p2.x, p2.y, 100, 100);

    switchTarget(setStatusValue)(target)
}

const selectRotation = target => radius => {
    target.direction += radius
}

const drawRotatedImage = (target, target2) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // コンテキストを保存する
    ctx.save();
    // 回転の中心に原点を移動する
    ctx.translate(target.x + 100, target.y);
    // ctx.translate(target2.x , target2.y);
    // canvasを回転する
    ctx.rotate((target.direction) * TO_RADIANS);

    if (target.direction < 0) {
        target.direction = Math.floor(target.direction / 90) >= 4 && Math.floor(target.direction / 90) >= 0 ?
            Math.floor(target.direction / 90) - 4 :
            Math.floor(target.direction / 90) < 0
                ? 360 + Math.floor(target.direction)
                : Math.floor(target.direction / 90)
    } else if (target.direction >= 360) {
        target.direction = 0
    }
    // console.log(Math.floor(target.direction / 90) >= 4 ? Math.floor(target.direction / 90) -4: Math.floor(target.direction / 90) )
    switch (
        Math.floor(target.direction / 90) >= 4 && Math.floor(target.direction / 90) >= 0 ?
            Math.floor(target.direction / 90) - 4 :
            Math.floor(target.direction / 90) < 0 ?
                360 + Math.floor(target.direction) :
                Math.floor(target.direction / 90)
        ) {
        case 1://90
            ctx.drawImage(target.image, -(0), -(0), 100, 100);
            // ctx.drawImage(target2.image, -(0), -(0), 100, 100);
            break
        case 2://180
            ctx.drawImage(target.image, -(0), -(100), 100, 100);
            // ctx.drawImage(target2.image, -(0), -(100), 100, 100);
            break
        case 3://270
            ctx.drawImage(target.image, -(100), -(100), 100, 100);
            // ctx.drawImage(target2.image, -(100), -(100), 100, 100);
            break
        case 0://0
            ctx.drawImage(target.image, -(100), -(0), 100, 100);
            // ctx.drawImage(target2.image, -(100), -(0), 100, 100);
            break
        default:
    }
    // コンテキストを元に戻す
    ctx.restore();
    if (target2.direction === 0) {
        ctx.drawImage(target2.image, target2.x, target2.y, 100, 100);
    } else {
        // コンテキストを保存する
        ctx.save();
        // 回転の中心に原点を移動する
        ctx.translate(target2.x + 100, target2.y);
        // canvasを回転する
        ctx.rotate((target2.direction) * TO_RADIANS);
        switch (
            Math.floor(target2.direction / 90) >= 4 && Math.floor(target2.direction / 90) >= 0 ?
                Math.floor(target2.direction / 90) - 4 :
                Math.floor(target2.direction / 90) < 0 ?
                    360 + Math.floor(target2.direction) :
                    Math.floor(target2.direction / 90)
            ) {
            case 1://90
                ctx.drawImage(target2.image, -(0), -(0), 100, 100);
                // ctx.drawImage(target2.image, -(0), -(0), 100, 100);
                break
            case 2://180
                ctx.drawImage(target2.image, -(0), -(100), 100, 100);
                // ctx.drawImage(target2.image, -(0), -(100), 100, 100);
                break
            case 3://270
                ctx.drawImage(target2.image, -(100), -(100), 100, 100);
                // ctx.drawImage(target2.image, -(100), -(100), 100, 100);
                break
            case 0://0
                ctx.drawImage(target2.image, -(100), -(0), 100, 100);
                // ctx.drawImage(target2.image, -(100), -(0), 100, 100);
                break
            default:
        }
    }
    ctx.restore();
    console.log(target.direction, target.name)
    console.log(target2.direction, target2.name)
}

const giveDamage = target => target2 => {
    console.log(target.name + 'の攻撃！ ' + target2.name + 'は20ダメージうけた！')
    target.MP -= consumptionMP.attack // fixme 関数型っぽくしたいならこの消費するMPの値も引数に組み込むといい
    target2.HP -= 20
    setStatusValue(target, target2)
}

const moveup = (target, target2) => {
    console.log('up')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    console.log(target.MP)
    if (target.MP <= 0) {
        console.log('mp0!')
        drawRotatedImage(target, target2)
    } else {
        target.MP -= consumptionMP.move // fixme 関数型っぽくしたいならこの消費するMPの値も引数に組み込むといい
        setStatusValue(target,target2)

        switch (target.direction) {
            case 90:
                moveright(target, target2)
                break
            case 180:
                if (target.x === target2.x && target.y === target2.y - 100) {
                    console.log('いたーい')
                    ctx.drawImage(target.image, target.x, target.y, 100, 100);
                } else if (target.y < 400) {
                    target.y += movement
                    drawRotatedImage(target, target2)
                } else {
                    console.log('out of range', target.y)
                    drawRotatedImage(target, target2)
                }
                break
            case 270:
                moveleft(target, target2)
                break
            case 0:

                if (target.x === target2.x && target.y === target2.y + 100) {
                    console.log('いたーい')
                    drawRotatedImage(target, target2)
                } else if (target.y > 0) {
                    target.y -= movement
                    drawRotatedImage(target, target2)
                } else {
                    console.log('out of range ', target.y)
                    drawRotatedImage(target, target2)
                }

                break
            default:
                console.error('何かがおかしい…事件に違いない…')
        }
    }

}

const movedown = (target, target2) => {
    console.log('down')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (target.MP <= 0) {
        console.log('mp0!')
        drawRotatedImage(target, target2)
    } else {
        target.MP -= consumptionMP.move // fixme 関数型っぽくしたいならこの消費するMPの値も引数に組み込むといい
        setStatusValue(target,target2)

        switch (target.direction) {
            case 90:
                moveleft(target, target2)
                break
            case 180:
                if (target.x === target2.x && target.y === target2.y + 100) {
                    console.log('いたーい')
                    drawRotatedImage(target, target2)
                } else if (target.y > 0) {
                    target.y -= movement
                    drawRotatedImage(target, target2)
                } else {
                    console.log('out of range ', target.y)
                    drawRotatedImage(target, target2)
                }
                break
            case 270:
                moveright(target, target2)
                break
            case 0:

                if (target.x === target2.x && target.y === target2.y - 100) {
                    console.log('いたーい')
                    ctx.drawImage(target.image, target.x, target.y, 100, 100);
                } else if (target.y < 400) {
                    target.y += movement
                    drawRotatedImage(target, target2)
                } else {
                    console.log('out of range', target.y)
                    drawRotatedImage(target, target2)
                }

                break
            default:
                console.error('何かがおかしい…事件に違いない…')
        }
    }

}

const moveright = (target, target2) => {
    console.log('right')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (target.x === target2.x - 100 && target.y === target2.y) {
        console.log('いたーい')
        drawRotatedImage(target, target2)
    } else if (target.x < 400) {
        target.x += movement
        drawRotatedImage(target, target2)
    } else {
        console.log('out of range ', target.x , target)
        drawRotatedImage(target, target2)

    }
}

const moveleft = (target, target2) => {
    console.log('left')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (target.x === target2.x + 100 && target.y == target2.y) {
        console.log('いたーい')
        drawRotatedImage(target, target2)
    } else if (target.x > 0) {
        target.x -= movement
        drawRotatedImage(target, target2)
    } else {
        console.log('out of range at left', target.x,target)
        drawRotatedImage(target, target2)
    }
}

const attack = (target, target2) => {
    //向いてる方向を見る => なんかそれっぽい画像の描画
    if (target.MP <= 0) {
        console.log('mp0!')
        drawRotatedImage(target, target2)
    } else {
        switch (target.direction) {
            case 90:
                ctx.drawImage(attacksample, target.x + 100, target.y, 100, 100)
                if (target.x + 100 === target2.x && target.y === target2.y) {
                    giveDamage(target)(target2)
                } else {
                    target.MP -= consumptionMP.attack
                }
                break
            case 180:
                ctx.drawImage(attacksample, target.x, target.y + 100, 100, 100)
                if (target.x === target2.x && target.y + 100 === target2.y) {
                    giveDamage(target)(target2)
                } else {
                    target.MP -= consumptionMP.attack
                }
                break
            case 270:
                ctx.drawImage(attacksample, target.x - 100, target.y, 100, 100)
                if (target.x - 100 === target2.x && target.y === target2.y) {
                    giveDamage(target)(target2)
                } else {
                    target.MP -= consumptionMP.attack
                }
                break
            case 0:
                ctx.drawImage(attacksample, target.x, target.y - 100, 100, 100)
                if (target.x === target2.x && target.y - 100 === target2.y) {
                    giveDamage(target)(target2)
                } else {
                    target.MP -= consumptionMP.attack
                }

                break
            default:
                console.error('何かがおかしい…事件に違いない…')
        }
    }
}

const debug = (action) => {
    switch (action.key) {
        case 'w':
            switchTarget(moveup)(target)
            //2pは反転
            switchTarget(movedown)(setTarget('kumasan'))
            break
        case 'a':
            switchTarget(selectRotation, -90)(setTarget('kumasan'))
            switchTarget(drawRotatedImage)(setTarget('kumasan'))

            switchTarget(selectRotation, -90)(target)
            switchTarget(drawRotatedImage)(target)
            break
        case 's':
            switchTarget(movedown)(target)
            //2pは反転
            switchTarget(moveup)(setTarget('kumasan'))
            break
        case 'd':
            switchTarget(selectRotation, 90)(setTarget('kumasan'))
            switchTarget(drawRotatedImage)(setTarget('kumasan'))

            switchTarget(selectRotation, 90)(target)
            switchTarget(drawRotatedImage)(target)
            break
        case 'q':
            switchTarget(selectRotation, -90)(target)
            switchTarget(drawRotatedImage)(target)
            break
        case 'e':
            switchTarget(selectRotation, 90)(target)
            switchTarget(drawRotatedImage)(target)
            break
        case 'f':
            switchTarget(attack)(target)
            break
        default :
            console.log(event)
    }
}

//main

try {
    window.addEventListener('keydown', event => debug(event))

    sleep(500).then(() => {
        console.log('sleepnow')
        initfunc()
    })
} catch (e) {
    console.error(e, "\nえらーおきてるよーーーりゅうくんきがついてーーーかんかんかんかんかんかんかんかんかんかんかんかん")
}