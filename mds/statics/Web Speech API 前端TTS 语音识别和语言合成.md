###  1.SpeechRecognition 语言识别demo
```javascript
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const colors = [
  "aqua",
  "azure",
  "beige",
  "bisque",
  "black",
  "blue",
  "brown",
  "chocolate",
  "coral",
];
// JSGF 规范
const grammar = `#JSGF V1.0; grammar colors; public <color> = ${colors.join(" | ",)};`;

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
// 被检索列表
recognition.grammars = speechRecognitionList;
// 不开启持续不间断
recognition.continuous = false;
// 识别语言
recognition.lang = "en-US";
// 不返回临时结果
recognition.interimResults = false;
// 最大匹配数量
recognition.maxAlternatives = 1;

document.querySelector("#btn").onclick=()=>{
  // 开始识别
  recognition.start();
  console.log("开始识别颜色...");
}

// 识别结果
recognition.onresult = (event) => {
  const color = event.results[0][0].transcript;
  diagnostic.textContent = `Result received: ${color}.`;
  bg.style.backgroundColor = color;
  console.log(`Confidence: ${event.results[0][0].confidence}`);
}

// 匹配到结果，就停止识别
recognition.onspeechend = () => {
  recognition.stop();
}

// 未能识别返回
recognition.onnomatch = (event) => {
  console.error("I didn't recognize that color")
}

// 错误异常时
recognition.onerror = (event) => {
  console.error(`Error occurred in recognition: ${event.error}`);
}

```



### 2.speechSynthesis 语音合成demo
```javascript
const synth = window.speechSynthesis;
// 获取音频声源列表
voices = synth.getVoices();
// 
let utterThis = new SpeechSynthesisUtterance();
// 内容
utterThis.text  = "are you ok?";
// 声源设置，不同浏览器不一样
utterThis.voiceURI = "Microsoft Huihui - Chinese (Simplified, PRC)"; // 声音和服务
// 声音音量区间范围是​​0​​​到​​1默认是​​1​​
utterThis.volume = 0.7; 
// 语言
utterThis.lang = "zh-cn"; 
// 音高大小 0-2
utterThis.pitch = 1 ;
// 语速快慢 语速，默认值是​​1​​​，范围是​​0.1​​​到​​10​​​
utterThis.rate = 1 ;
synth.speak(utterThis);


// 支持事件：暂停、恢复、取消
window.speechSynthesis.pause();
window.speechSynthesis.resume();
window.speechSynthesis.cancel();
```

