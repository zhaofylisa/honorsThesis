// Remove command prefix
PennController.ResetPrefix(null);

//generate unique id
uniqueID = [1,2,3,4].map(v=>Math.floor((1+Math.random())*0x10000).toString(16).substring(1)).join('-');

// define a function to get a random number in range(0,max)
function getRandomTask(max) {
  return Math.floor(Math.random() * max);
}

//choose a random task for participants
var exp = getRandomTask(3) // possible int: 0,1,2

// task 1
if(exp == 0){
    Sequence("consent","intro","background","intro-2","ex1-instructions","1.1 training-v2","endTrain-1", randomize("1.2 prior-v2"),"send","debrief","payment_form","send","completion_screen");
}

//task 2
else if(exp == 1){
    Sequence("consent","intro","background","intro-2","ex2-instructions", randomize('2.1 training'),"endTrain-2", randomize("2.2 likelihood"),"send","debrief","payment_form","send","completion_screen");
}

//task 3
else{
    Sequence("consent","intro","background","intro-2","ex3-instructions", randomize("3.1 training"),"endTrain-3",randomize("3.2 posterior"),"send","debrief","payment_form","send","completion_screen");
}

//DebugOff()
//Sequence("consent","intro","background","intro-2","ex1-instructions","1.1 training-v2","endTrain-1", randomize("1.2 prior-v2"),"send","ex2-instructions", randomize('2.1 training'),"endTrain-2", randomize("2.2 likelihood") ,"send","ex3-instructions", randomize("3.1 training"),"endTrain-3",randomize("3.2 posterior") ,"send","debrief","send","completion_screen")
//Sequence("consent","background","intro","intro-2");
//Sequence("debrief","send","payment_form","send","completion_screen")
//uncomment for experiment 1 - version2
//Sequence("ex1-instructions","1.1 training-v2","endTrain-1", randomize("1.2 prior-v2") )

//uncomment for experiment 2
//Sequence("ex2-instructions", randomize('2.1 training'),"endTrain-2", randomize("2.2 likelihood") )

//uncomment for experiment 3
//Sequence("ex3-instructions", randomize("3.1 training"),"endTrain-3",randomize("3.2 posterior") )


// consent form
newTrial("consent",
    newHtml("consent_form","consent.html")
        .cssContainer({"width":"720px"})
        .checkboxWarning("继续实验前请先勾选同意。")
        .log()
        .print()
    ,
    newButton("continue", "点击继续")
        .center()
        .print()
        .wait(getHtml("consent_form").test.complete()
                  .failure(getHtml("consent_form").warn())
        )
).log( "ID" , uniqueID );

// background form
newTrial("background",
    newHtml("background","background.html")
        .cssContainer({"width":"720px"})
        .checkboxWarning("开始实验前请先完整回答问卷。")
        .log()
        .print()
    ,
    newButton("continue", "点击继续")
        .center()
        .print()
        .wait(getHtml("background").test.complete()
                  .failure(getHtml("background").warn())
        )
).log( "ID" , uniqueID )
;

//Intro
newTrial("intro",
        newText("Hello! 欢迎您参加实验🎉")
            .bold()
            .center()
            .print()
        ,
        newText("id", "请保存您的实验ID：  "+ uniqueID )
            .bold()
            .color("red")
            .center()
            .print()
        ,
        newText("<p>请使用电脑完成实验，强烈建议使用Chrome, Firefox, 或Safari浏览器。")
            .center()
            .print()
        ,
        newText("实验时长大约10分钟，实验一旦中断则无法继续进行。")
            .center()
            .print()
        ,
        newText("屏幕顶部会显示实验进程，<b>请全程保持专注</b>。")
            .center()
            .print()
        ,
        newText("请在<b>实验结束后</b>窗口填写您的支付宝账号用于收款。</p>")
            .center()
            .print()
        // ,
        // newText("<p>本次实验分为三项任务：</p>")
        //     .center()
        //     .print()
        // ,
        // newText("<b>任务1. 选择图片来补充不完整场景。</b>")
        //     .center()
        //     .print()
        // ,
        // newText("<b>任务2. 根据图片内容，选择代词来补充不完整句子。</b>")
        //     .center()
        //     .print()
        // ,
        // newText("<b>任务3. 根据句子，选择图片来回答问题。</b>")
        //     .center()
        //     .print()
        ,
        newText("<p>任务开始前会进行介绍并提供训练模式，按照指示操作即可 :)</p>")
            .center()
            .print()
        ,
        newText("<p有些情况下没有唯一答案，不同人会有不一样的直觉，这是十分正常的:) </p>")
            .center()
            .print()
        ,
        newText("请根据您的直觉及日常习惯进行选择。")
            .center()
            .print()
        ,
        newText("请仔细阅读每一个场景，<b>有唯一答案</b>的场景请尽量回答正确。</p>")
            .center()
            .print()
        ,
        newText("您的任务表现可能会影响您的最终报酬，请认真完成实验任务。</p>")
            .center()
            .print()
        ,
        newText("实验正式开始前，请先填写一份语言背景的调查问卷。</p>")
            .center()
            .print()
        ,
        newButton("wait", "点击填写背景问卷")
            .center()
            .print()
            .wait()
        // ,
        // newVar("ID")
        //     .global()
        //     .set(getTextInput("input_ID"))
        // ,
        // newVar("Email")
        //     .global()
        //     .set(getTextInput("email"))
)

// introduction to the character
newTrial('intro-2',
    newText("人物介绍")
        .bold()
        .css("font-size", "1.5em")
        .center()
        .print()
    ,
    newText("instructions-1", "<p>实验过程中您将经常遇见以下四位人物：</p>")
        .center()
        .print()
    ,
    newImage("w1", "wanggang.png")
        .size(150,150)
    ,
    newImage("w2", "lihua.png")
        .size(150,150)
    ,
    newImage("w3", "xiaoming.png")
        .size(150,150)
    ,
    newImage("w4", "other.png")
        .size(150,150)
    ,
    newCanvas('worlds', 650, 250)
        .add( 0, 50, getImage('w1') )
        .add( 160, 50, getImage('w2'))
        .add( 320, 50, getImage('w3'))
        .add( 480, 50, getImage('w4'))
        .center()
        .print()
    ,
    newText("instructions-2", "<p>请注意：他们<font color=red>没有</font>固定的人设。<br>实验中每个句子中的人物都是独立存在，与上下句<font color=red>无关</font>。</p>")
        .center()
        .print()
    ,
    newButton("wait", "点击开始实验")
        .center()
        .print()
        .wait()
)



//1. prior experiment - select picture
// Instructions
newTrial("ex1-instructions",
    newText("instructions-1", "任务介绍")
        .bold()
        .css("font-size", "1.5em")
        .center()
        .print()
    ,
    newText("（欢迎欢迎 👏）")
        .bold()
        .center()
        .print()
    ,
    newText("instructions-2", "<p>在此任务中，您将会看到一个不完整的场景以及三张人物图片。您需要：</p>")
        .center()
        .print()
    ,
    newText("instructions-3", "<b> 1. 首先阅读场景及空缺部分 📖 </b>")
        .print()
    ,
    newText("instructions-4", "<b> 2. 根据您的直觉💡，<b style='color:Blue;'> 鼠标点击 </b>，在三个人物中选择一个补充缺少部分，让场景最有可能发生，越快越好，您的按键时间将被记录。（小tip：选择前可以先闭上眼睛想象一个场景）</b>")
        .print()
    ,
    newText("instructions-6", "<p>不用担心，在正式开始前我们会先给您展示一个范例。范例将模拟受试者的内心活动，解释选择背后的原因。在实验过程中将持续给有指示，按照指示操作即可 :)  </p>")
        .center()
        .print()
    ,
    newText("<p>您的任务表现可能会影响您的最终报酬，请认真完成实验任务。</p>")
            .center()
            .print()
    ,
    newButton("wait", " 查看范例 ")
        .center()
        .print()
        .wait()
)

//1.1 training - version2
newTrial("1.1 training-v2",
    newText(" 范例 ")
        .bold()
        .css("border", "solid 1px black")
        .center()
        .print()
    ,
    newText('s1',"   </p> &nbsp：“&nbsp")
        .bold()
        .css("font-size", "1.6em")
        .before( newImage("wanggang.png").size(90) )

    ,
    newText("s2", '<br><br>&nbsp把<font color = red>&nbsp &nbsp?&nbsp &nbsp</font>的杯子打碎了 ”')
        .center()
        .bold()
        .css("font-size", "1.6em")
    ,
    newImage("lihua.png")
        .size(90,90)
        .before(getText('s1'))
        .after(getText('s2'))
        .center()
        .print()
    ,
    newText(" -----------------------------------------------------------------------------------------------------------").center().print()
    ,
    newText("question", "请选择：以下三个人物中，哪个人物<font color = red>最有可能</font>被补充到 <font color = red>?</font> 处, 使得以上场景最有可能发生？")
        .bold()
        .center()
        .print()
    ,
    newText("（小tip：选择前可以先闭上眼睛想象一个场景）")
        .bold()
        .center()
        .print()
    ,
    newText("instruction", "<br>请<b style='color:Blue;'> 用鼠标<b>依次点击</b></b> 三个人物查看选择背后的原因。")
        .center()
        .print()
    ,
    newText("feedback")
    ,
    newImage("w1", "wanggang.png")
        .size(200,200)
    ,
    newImage("w2", "lihua.png")
        .size(200,200)
    ,
    newImage("w3", "other.png")
        .size(200,200)
    ,
    newText("pleasewait", "</br>请先思考3秒……")
        .bold()
        .center()
        .print()
    ,
    newTimer("wait", 3000)
        .start()
        .wait()
    ,
    getText("pleasewait")
        .remove()
    ,
    newCanvas( 'worlds', 700, 450)
        .add( 0, 50, getImage('w1') )
        .add( 250, 50, getImage('w2'))
        .add( 500, 50, getImage('w3'))
        .center()
        .print()
    ,
    newSelector("world")
        .add( getImage("w1") , getImage("w2"), getImage("w3") )
        .log("all")
    ,
    getSelector("world")
        .callback(
            getSelector("world")
                .test.selected(getImage("w2")).success( 
                    getText("feedback")
                            .text("<p>选【李华】是因为我的第一直觉为以下情景：</p> 有人问王刚为什么送李华一个杯子，王刚解释道：“李华把自己的杯子打碎了。我正好多出来个新杯子送他。”")
                            .color("red")
                            .center()
                            .print(150,250,"worlds")
                )
                .test.selected(getImage("w1")).success(
                    getText("feedback")
                        .text("<p>选【王刚】是因为我的第一直觉为以下情景：</p>有人问王刚为什么要去买杯子，王刚解释道：“李华把我的杯子打碎了。我去超市买个新的。”")
                        .color("red")
                        .center()
                        .print(150,250,"worlds")
                    
                )
                .test.selected(getImage("w3")).success(
                    getText("feedback")
                        .text("<p>选【其他人】是因为我的第一直觉为以下情景：</p>王刚和家人在家里喝茶时，某一家人没有找到杯子，王刚解释道：“李华把你的杯子打碎了。我再去给你拿一个。”")
                        .color("red")
                        .center()
                        .print(150,250,"worlds")
                    
                )
        )
    ,
    getSelector("world").wait()
    ,
    newText("你想象中的场景是什么样的呢？")
        .bold()
        .center()
        .print(180,360,"worlds")
    ,
    newText("button","三个人物都查看完后，请点击 ")
    ,
    newButton("wait", " 我了解了")
        .center()
        .bold()
        .before(getText("button"))
        .after(newText("结束范例。"))
        .print(150,400,"worlds")
        .wait()
).log( "ID" , uniqueID )

//end training
newTrial("endTrain-1",
    newText("范例结束!")
            .bold()
            .css("font-size", "1.5em")
            .center()
            .print()
    ,
    // newText("<p> 范例结束! </p>")
    //     .bold()
    //     .css("font-size", "2em")
    //     .center()
    //     .print()
    // ,
    newText("<p>马上开始正式任务，正式任务中将<font color=red>不会</font>有范例中出现的反馈。</p>")
        .center()
        .print()
    ,
    newText("<p>不同人会有不一样的直觉，这是十分正常的:) 根据您的直觉及日常习惯进行选择即可。")
        .center()
        .print()
    ,
    newText("请仔细阅读每一个场景，<b>有唯一答案</b>的场景请尽量回答正确。</p>")
        .center()
        .print()
    ,
    newText("<p>在实验过程中将持续给有指示，按照指示操作即可。</p>")
        .center()
        .print()
    ,
    newButton("wait", " 正式开始吧！")
        .center()
        .print()
        .wait()
);

//1.2 version2
// instead of the name of the character, here we use the pictures of the character
Template("item1.csv",
    row => newTrial( "1.2 prior-v2" ,
        newTimer("break", 1000)
            .start()
            .wait()
        ,
        newImage("W1", row.W1)
            .size(200,200)
        ,
        newImage("W2", row.W2)
            .size(200,200)
        ,
        newImage("W3", row.W3)
            .size(200,200)
        ,
        newText('s1',"&nbsp ：“ ")
            .bold()
            .css("font-size", "1.6em")
            .before( newImage(row.W1).size(90,90) )
        ,
        newText("s2", "<br><br>&nbsp"+row.sentence2 + '”')
            .center()
            .bold()
            .css("font-size", "1.6em")
        ,
        newImage(row.W2)
            .size(90,90)
            .before(getText('s1'))
            .after(getText('s2'))
            .center()
            .print()
        ,
        newText(" -----------------------------------------------------------------------------------------------------------").center().print()
        ,
        newText("question", "请选择：以下三个人物中，哪个人物最有可能被补充到 ? 处，使得以上场景最有可能发生？")
            .bold()
            .color("red")
            .center()
            .print()
        ,
        newText("（小tip：选择前可以先闭上眼睛想象一个场景）")
            .bold()
            .color("red")
            .center()
            .print()
        ,
        newText("instruction", "请<b style='color:Blue;'> 用鼠标<b>点击</b></b> 选择。<b>越快越好</b>，按键时间将被记录。")
            .center()
            .print()
        ,
        newText("pleasewait", "</br>请先思考2秒……")
            .center()
            .print()
        ,
        newTimer("wait", 2000)
            .start()
            .wait()
        ,
        getText("pleasewait")
            .remove()
        ,
        newCanvas( 'worlds', 700, 350)
            .add( 0, 50, getImage('W1') )
            .add( 250, 50, getImage('W2'))
            .add( 500, 50, getImage('W3'))
            .center()
            .print()
        ,
        newSelector("world")
            .add( getImage("W1") , getImage("W2"),getImage("W3") )
            .shuffle()
            .log()
            .wait()
    )
    .log( "ID" , uniqueID )
    .log("experiment", row.experiment)
    .log("senID", row.senID)
    .log("item", row.item)
    .log("type", row.type)
    .log("sentence", row.sentence)
    .log("W1", row.W1)
    .log("W2", row.W2)
    .log("W3", row.W3)
);



//2. likelihood experiment - dropdown 

// 2.0 instruction
newTrial("ex2-instructions",
    newText("instructions-1", "任务介绍")
        .bold()
        .css("font-size", "1.5em")
        .center()
        .print()
    ,
    newText("（欢迎欢迎 👏）")
        .bold()
        .center()
        .print()
    ,
    newText("instructions-2", "<p>您将会看到一个不完整的句子以及一张人物图片，<font color = red>这个人物就是句子缺少的部分</font>。您需要：</p>")
        .center()
        .print()
    ,
    newText("instructions-3", "<b> 1. 阅读句子，图片人物是句子缺少部分，通过图片理解句子意思 📖。</b>")
        .print()
    ,
    newText("instructions-4", "<b> 2. 在下拉框中，选择适当的代词，<font color = red>与图意相符且符合中文语法</font>。越快越好，您的选择时间将被记录。</b>")
        .print()
    ,
    newText("instructions-5", "<b> 3. 有些情况下并没有唯一答案，不同人会有不一样的直觉，这是十分正常的:) 相信您的第一直觉及日常习惯，选择<font color = red>最顺口</font>那个。</b>")
        .print()
    ,
    newText("instructions-7", "<p>首先您将进入练习模式。练习模式内含有五个句子，其目的为熟悉任务流程。练习模式结束后会进入正式任务。 </p>")
        .center()
        .print()
    ,
    newText("<p>您的任务表现可能会影响您的最终报酬，请认真完成实验任务。</p>")
            .center()
            .print()
    ,
    newButton("wait", " 进入练习模式")
        .center()
        .print()
        .wait()
);

//2.1 training
Template("item2-train.csv",
    row => newTrial( "2.1 training" ,
        newTimer("break", 1000)
            .start()
            .wait()
        ,
        newText(" 训练模式 ")
        .bold()
        .css("border", "solid 1px black")
        .center()
        .print()
        ,
        newText("instruct","<br>图中的人物代表句子缺少的人物。")
            .color("red")
            .center()
            .print()
        ,
        newText("instruct-2","请根据您的直觉及日常习惯，选择<font color = red>与图中人物相符的代词</font>来完整句子。")
            .bold()
            .center()
            .print()
        ,
        
        newText("<br><b>（小tip：补充完后可以读一遍，是否与图意相符？是否符合语法？</b>）")
            .center()
            .print()
        ,
        
        newText("<p> -----------------------------------------------------------------------------------------------------------</p>").center().print()
        ,
        newDropDown("pronouns", "")
            .add('他','他自己','自己', row.op4)
            .shuffle()
            .before(newText("sentence", row.sentence + " ")
                .bold()
                .css("font-size", "1.8em"))
            .after(newText("sentence2", " " + row.sentence2 )
                .bold()
                .css("font-size", "1.8em"))
            .center()
            .bold()
            .css("font-size", "1.5em")
            .log()
            .print()
        ,
        newText('</p>').print()
        ,
        newImage("trueworld", row.world)
            .size(300,300)
            .center()
            .print()
        ,
        getDropDown("pronouns")
            .wait()
        ,
        newButton("next", "Next")
            .center()
            .bold()
            .log()
            .css("font-size", "1em")
            .print(880,390)
            .wait()
    )
    .log( "ID" , uniqueID )
    // .log("Email", getVar("Email"))
    .log("experiment", row.experiment)
    .log("item", row.item)
    .log("sentence", row.sentence)
    .log("sentence2", row.sentence2)
    .log("world", row.world)
);

newTrial("endTrain-2",
    newText("训练模式结束! ")
            .bold()
            .css("font-size", "1.5em")
            .center()
            .print()
    ,
    // newText("<p> 训练模式结束! </p>")
    //     .bold()
    //     .css("font-size", "2em")
    //     .center()
    //     .print()
    // ,
    newText("<p>马上开始正式任务，有些情况<b>并没有唯一答案</b>，根据您的直觉及日常习惯进行选择即可。</p>")
        .center()
        .print()
    ,
    newText("<p>越快越好，您的选择时间将被记录。</p>")
        .color("blue")
        .center()
        .print()
    ,
    newText("请仔细阅读每一个句子，<b>有唯一答案</b>的场景请尽量回答正确。</p>")
            .center()
            .print()
    ,
    newText("<p>不用担心，在实验过程中将持续给有指示，按照指示操作即可:) </p>")
        .center()
        .print()
    ,
    newButton("wait", " 正式开始吧！")
        .center()
        .print()
        .wait()
)

//2.2 start experiment
Template("item2.csv",
    row => newTrial( "2.2 likelihood" ,
        newTimer("break", 1000)
            .start()
            .wait()
        ,
        newText("instruct","<br>图中的人物代表句子缺少的人物。")
            .color("red")
            .center()
            .print()
        ,
        newText("instruct-2","请根据您的直觉及日常习惯，选择<font color = red>与图中人物相符的代词来完整句子</font>。")
            .bold()
            .center()
            .print()
        ,
        
        newText("<br><b>（小tip：补充完后可以读一遍，是否与图意相符？是否符合语法？</b>）")
                .center()
                .print()
        ,
        
        newText("<p> -----------------------------------------------------------------------------------------------------------</p>").center().print()
        ,
        newDropDown("pronouns", "")
            .add('他','他自己','自己',row.op4)
            .shuffle()
            .before(newText("sentence", row.sentence + ' ')
                .bold()
                .css("font-size", "1.8em"))
            .after(newText("sentence2", " " + row.sentence2 )
                .bold()
                .css("font-size", "1.8em"))
            .center()
            .bold()
            .css("font-size", "1.5em")
            .log()
            .print()
        ,
        newText('</p>').print()
        ,
        newImage("trueworld", row.world)
            .size(300,300)
            .center()
            .print()
        ,
        getDropDown("pronouns")
            .wait()
        ,
        newButton("next", "Next")
            .center()
            .bold()
            .css("font-size", "1.1em")
            .print(850,370)
            .wait()
    )
    .log( "ID" , uniqueID )
    // .log("Email", getVar("Email"))
    .log("senID", row.senID)
    .log("experiment", row.experiment)
    .log("Group", row.Group)
    .log("type", row.type)
    .log("item", row.item)
    .log("condition",row.condition)
    .log("sentence", row.sentence)
    .log("sentence2", row.sentence2)
    .log("world", row.world)
);

// 3. posterior experiment
// Instructions
newTrial("ex3-instructions",
    newText("instructions-1", "任务介绍")
        .bold()
        .css("font-size", "1.5em")
        .center()
        .print()
    ,
    newText("（欢迎欢迎 👏）")
        .bold()
        .center()
        .print()
    ,
    newText("instructions-2", "<p>您将会看到一个句子，一个问题，以及三张人物图片。您需要：</p>")
        .center()
        .print()
    ,
    newText("instructions-3", "<b>1. 首先阅读句子和问题 📖（小tip：可以读出声来） </b>")
        .print()
    ,
    newText("instructions-4", "<b>2. 根据句子和您的直觉，迅速思考问题答案后💡，按<b style='color:Blue;'> 空格键 </b>继续，越快越好，您的按键时间将被记录。</b>")
        .print()
    ,
    newText("instructions-5", "<b>3. 在接下来出现的三张图中，用<b style='color:Blue;'> 鼠标点击 </b>选择您心中的答案 ✅，越快越好，您的选择时间将被记录。</b>")
        .print()
    ,
    newText("<br>有些情况下没有唯一答案，不同人会有不一样的直觉，这是十分正常的:) ")
        .center()
        .print()
    ,
    newText("请根据您的直觉及日常习惯进行选择。")
        .center()
        .print()
    ,
    newText("<br>请仔细阅读每一个句子，有唯一答案的场景请尽量回答正确。")
            .center()
            .print()
    ,
    newText("您的任务表现可能会影响您的最终报酬，请认真完成实验任务。<br>")
            .center()
            .print()
    ,
    newText("instructions-7", "<p>首先您将加入<b>练习模式</b>，完成后开始正式任务。练习模式内含有五个句子，其目的为熟悉任务流程，因此您选择完毕后会给出反馈。但是，正式任务中将<font color=red>不会</font>有任何反馈。</p>")
        .center()
        .print()
    ,
    newButton("wait", " 进入练习模式 ")
        .center()
        .print()
        .wait()
)
//3.1 training - 5 trials
Template("item3-train.csv",
row => 
    newTrial("3.1 training",
        newTimer("break", 1000)
                .start()
                .wait()
        ,
        newVar("correct")
            .log("set")
        ,
        newText(" 训练模式 ")
        .bold()
        .css("border", "solid 1px black")
        .center()
        .print()
        ,
        newText("feedback")
        ,
        newText("sentence", row.sentence)
                    .bold()
                    .css("font-size", "2em")
                    .center()
                    .print()
        ,
        newTimer("wait", 10000)
            .start()
        ,
        newText("question", "</p>" + row.question)
            .bold()
            .css("font-size", "1.2em")
            .before(newText("</p> 问题：").css("font-size", "1.2em"))
            .color("red")
            .center()
            .print()
        ,
        newText("instruction", "</p> 请先思考，然后迅速按 <b style='color:Blue;'> 空格键</b> 继续，越快越好，按键时间将被记录。")
            .center()
            .print()
        ,
        newKey("space", " ")
            .callback( getTimer("wait").stop() )
            .log()
        ,
        getTimer("wait")
            .wait()
        ,
        //  getText("sentence")
        //     .remove()
        // ,
        getText("instruction")
            .remove()
        ,
        newText("</p> 请用<b style='color:Blue;'> 鼠标点击 </b> 选择 ")
            .center()
            .print()
        ,
        newImage("op1", row.option1)
            .size(200,200)
            //.print()
        ,
        newImage("ans", row.answer)
            .size(200,200)
            //.before( getImage("W1") )
        ,
        newImage("op3", row.option3)
            .size(200,200)
            //.before( getImage("W2") )
            //.print()
        ,
        newCanvas( 'worlds', 700, 200)
            .add( 0, 50, getImage('op1') )
            .add( 250, 50, getImage('ans'))
            .add( 500, 50, getImage('op3'))
            .center()
            .print()
        ,
        newSelector("world")
            .add( getImage("op1") , getImage("ans"), getImage("op3") )
            .shuffle()
            .once()
            .log()
            .wait()
        ,
        getSelector("world")
            .test.selected(getImage("ans"))
            .success( 
                getText("feedback")
                    .text("正确！按空格键继续")
                    .color('red')
                    .center()
                    .print(280,300,"worlds")
                ,
                getVar("correct")
                    .set(true)
            )
            .failure( 
                getText("feedback")
                    .text("错误!")
                    .after(newText(row.feedback).color("red"))
                    .after(newText("</p> 按空格键继续").color("red"))
                    .color("red")
                    .center()
                    .print(280,300,"worlds")
                ,
                getVar("correct")
                    .set(false)
                )
        ,
        newTimer("post-trial", 3000).start()
        ,
        newKey(" ")
            .callback( getTimer("post-trial").stop() )
            .log()
        ,
        getTimer("post-trial")
            .wait()

    )
    .log("experiment", row.experiment)
    .log("sentence", row.sentence)
    .log("item", row.item)
    .log("Correct", getVar("correct"))
    .log( "ID" , uniqueID )
    // .log("Email", getVar("Email"))
)

newTrial("endTrain-3",
    newText("训练模式结束!")
            .bold()
            .css("font-size", "1.5em")
            .center()
            .print()
    ,
    // newText("<p> 训练模式结束! </p>")
    //     .bold()
    //     .css("font-size", "2em")
    //     .center()
    //     .print()
    // ,
    newText("<br>正式任务中将<font color=red>不会</font>有练习模式中出现的反馈，同时可能出现<font color = red>模棱两可</b>的情况。")
        .center()
        .print()
    ,
    newText("不同人会有不一样的直觉，这是十分正常的:) ")
            .center()
            .print()
    ,
    newText("请根据您的第一直觉及日常习惯进行选择。<br>")
        .center()
        .print()
    ,
    newText("<br>请仔细阅读每一个句子，有唯一答案的场景请尽量回答正确。")
            .center()
            .print()
    ,
    newText("您的任务表现可能会影响您的最终报酬，请认真完成实验任务。<br>")
            .center()
            .print()
    ,
    newText("<p>不用担心，在实验过程中将持续给有指示，按照指示操作即可:) </p>")
        .center()
        .print()
    ,
    newButton("wait", " 正式开始吧！")
        .center()
        .print()
        .wait()
);
 


//3.2 start
// show the sentence and give participants several seconds to think about the answer
Template("item3.csv",
    row => newTrial( "3.2 posterior" ,
        newTimer("break", 1000)
            .start()
            .wait()
        ,
        newText("sentence", row.sentence)
            .bold()
            .css("font-size", "2em")
            .center()
            .print()
        ,
        newTimer("wait", 15000)
            .start()
        ,
        newText("question", "</p>" + row.question)
            .bold()
            .css("font-size", "1.2em")
            .before(newText("</p> 问题：").css("font-size", "1.2em"))
            .color("red")
            .center()
            .print()
        ,
        newText("instruction", "</p> 请先思考，然后迅速按 <b style='color:Blue;'> 空格键</b> 继续，越快越好按键时间将被记录。")
            .center()
            .print()
        ,
        newKey("space", " ")
            .callback( getTimer("wait").stop() )
            .log()
        ,
        getTimer("wait")
            .wait()
        ,
        //  getText("sentence"
        // ,
         getText("instruction")
            .remove()
        ,
        newText("</p> 请用<b style='color:Blue;'> 鼠标点击 </b> 选择 ")
            .center()
            .print()
        ,
        newImage("W1", row.W1)
            .size(200,200)
            //.print()
        ,
        newImage("W2", row.W2)
            .size(200,200)
            //.before( getImage("W1") )
            //.print()
        ,
        newImage("W3", row.W3)
            .size(200,200)
            //.before( getImage("W2") )
            //.print()
        ,
        newCanvas( 'worlds', 700, 200)
            .add( 0, 50, getImage('W1') )
            .add( 250, 50, getImage('W2'))
            .add( 500, 50, getImage('W3'))
            .center()
            .print()
        ,
        newSelector("world")
            .add( getImage("W1") , getImage("W2"),getImage("W3") )
            .shuffle()
            .once()
            .log()
            .wait()
    )
    .log( "ID" , uniqueID )
    // .log("Email", getVar("Email"))
    .log("experiment", row.experiment)
    .log("senID", row.senID)
    .log("Group", row.Group)
    .log("item", row.item)
    .log("type", row.type)
    .log("condition",row.condition)
    .log("sentence", row.sentence)
    .log("w1",row.W1)
    .log("w2",row.W2)
    .log("w3",row.W3)
);

// debriefing form
newTrial("debrief",
    newHtml("debriefing_form", "debrief.html")
        .cssContainer({"width":"720px"})
        .log()
        .print()
    ,
    newButton("continue", "提交实验数据")
        .center()
        .print()
        .wait(
            getHtml("debriefing_form").test.complete()
                .failure( getHtml("debriefing_form").warn() )
        )
).log( "ID" , uniqueID )

// payment_form
newTrial("payment_form",
    newHtml("payment_form", "alipay2.html")
        .cssContainer({"width":"720px"})
        .checkboxWarning("请勾选已核对。")
        .inputWarning("请完整填写问卷。")
        .log()
        .print()
    ,
    newButton("continue", "完成实验")
        .print()
        .center()
        .wait(
            getHtml("payment_form").test.complete(true)
                .failure( getHtml("payment_form").warn() )
        )
).log( "ID" , uniqueID )

// Send results
SendResults("send")

// Completion screen
newTrial("completion_screen",
    newText("thanks", "感谢您的参与！" + "您的ID为："+ uniqueID )
        .bold()
        .color('red')
        .center()
        .print()
    ,
    newText("exit", "您的报酬将于15日内转入您的支付宝账号。若有任何疑问，请联系研究人员赵丰悦（zhaofylisa@gmail.com）并告知您的实验ID。祝您生活愉快 :) ")
        .center()
        .print()
    ,
    newText(" 您现在可以关闭此窗口...")
        .center()
        .print()
    ,
    newButton("void", "")
        .wait()
)
