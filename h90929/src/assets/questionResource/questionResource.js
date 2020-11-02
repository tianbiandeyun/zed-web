const questionResource = {
    /**
     * 结果图片
     * A 操纵 B 变态 C 自恋 AB 腹黑 AC 伪装 BC 贪婪
     * */
    resultImages: {
        A: require('../images/result/caozong.png'),
        B: require('../images/result/biantai.png'),
        C: require('../images/result/zilian.png'),
        AB: require('../images/result/fuhei.png'),
        AC: require('../images/result/weizhuang.png'),
        BC: require('../images/result/tanlan.png')
    },
    /**
     * 题目
     * */
    questionList: [
        {
            'key': '我倾向于通过操纵他人来得到我想要的东西:',
            'num': 1,
            'type': 'A',
            'val': [{
                'val': 'YES',
                'valid': '1',
                'valnum': '7'
            }, {
                'val': 'NO',
                'valid': '2',
                'valnum': '1'
            }]
        },
        {
            'key': '我可能缺乏同情心:',
            'num': 2,
            'type': 'B',
            'val': [{
                'val': 'YES',
                'valid': '3',
                'valnum': '7'
            }, {
                'val': 'NO',
                'valid': '4',
                'valnum': '1'
            }]
        },
        {
            'key': '我更希望别人来赞赏我:',
            'num': 3,
            'type': 'C',
            'val': [{
                'val': 'YES',
                'valid': '5',
                'valnum': '7'
            }, {
                'val': 'NO',
                'valid': '6',
                'valnum': '1'
            }]
        },
        {
            'key': '我可能对自己的行为道德并不关心:',
            'num': 4,
            'type': 'B',
            'val': [{
                'val': 'YES',
                'valid': '7',
                'valnum': '7'
            }, {
                'val': 'NO',
                'valid': '8',
                'valnum': '1'
            }]
        },
        {
            'key': '我曾经通过欺骗或谎言来达到目的:',
            'num': 5,
            'type': 'A',
            'val': [{
                'val': 'YES',
                'valid': '9',
                'valnum': '7'
            }, {
                'val': 'NO',
                'valid': '10',
                'valnum': '1'
            }]
        },
        {
            'key': '我可能比较冷漠麻木:',
            'num': 6,
            'type': 'B',
            'val': [{
                'val': 'YES',
                'valid': '11',
                'valnum': '7'
            }, {
                'val': 'NO',
                'valid': '12',
                'valnum': '1'
            }]
        },
        {
            'key': '我曾利用阿谀奉承来达到目的:',
            'num': 7,
            'type': 'A',
            'val': [{
                'val': 'YES',
                'valid': '13',
                'valnum': '7'
            }, {
                'val': 'NO',
                'valid': '14',
                'valnum': '1'
            }]
        },
        {
            'key': '我想要追求权利或地位:',
            'num': 8,
            'type': 'C',
            'val': [{
                'val': 'YES',
                'valid': '15',
                'valnum': '7'
            }, {
                'val': 'NO',
                'valid': '16',
                'valnum': '1'
            }]
        },
        {
            'key': '我想要别人关注我:',
            'num': 9,
            'type': 'C',
            'val': [{
                'val': 'YES',
                'valid': '17',
                'valnum': '7'
            }, {
                'val': 'NO',
                'valid': '18',
                'valnum': '1'
            }]
        }
    ]

};
export default questionResource
