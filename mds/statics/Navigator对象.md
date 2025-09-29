navigator 是浏览器内置的一个全局对象，它提供了关于用户浏览器、设备、网络环境和功能支持的信息。

## 一、核心属性
### 基本信息属性
+ **appCodeName** - 浏览器代码名称，Chrome、Firefox、Edge 等浏览器都会返回 `"Mozilla"`
+ **appName** - 浏览器的官方名称，Chrome、Firefox、Edge 等现代浏览器返回 `Netscape`（网景浏览器）
+ **appVersion** - 浏览器的版本信息字符串
+ **platform** - 操作系统平台的标识符
    - `Win32/64` - Windows 系统
    - `MacIntel` - Intel 芯片的 macOS 系统  
    - `iPhone/iPad/iPod` - iOS 设备
    - `Linux *` - Linux 系统不同架构
    - `Android` - Android 设备

### 语言与国际化
+ **language** - 浏览器的首选语言
+ **languages** - 浏览器可用的所有语言数组

### 隐私与追踪
+ **doNotTrack** - 设置用于告知网站用户不希望被跟踪其浏览行为
    - `"1"` 或 `"yes"`：表示用户启用了"不跟踪"功能
    - `"0"` 或 `"no"`：表示用户明确禁用了"不跟踪"功能
    - `"unspecified"`：表示用户未设置该选项（默认状态）
    - `null` 或 `undefined`：某些浏览器可能不支持该属性

### 浏览器引擎信息
+ **product** - 浏览器引擎的产品名称，通常是 `"Gecko"`
+ **productSub** - 浏览器引擎额外版本信息
+ **vendor** - 浏览器供应商的标识字符串，如 `"Google Inc."`、`"Apple Computer, Inc."`

### 设备能力检测
+ **userAgent** - 浏览器的用户代理字符串，包含了浏览器类型、版本、操作系统及渲染引擎等信息
+ **webdriver** - 浏览器是否被自动化工具控制
+ **onLine** - 浏览器的网络连接状态
+ **pdfViewerEnabled** - 浏览器是否内置支持 PDF 查看功能
+ **maxTouchPoints** - 设备能同时识别的触摸输入数量

## 二、常用 API 与方法
### 1. 剪切板 API (Clipboard)
```javascript
// 写入剪切板
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('文本已复制到剪切板');
  } catch (err) {
    console.error('复制失败:', err);
  }
}

// 读取剪切板
async function pasteText() {
  try {
    const text = await navigator.clipboard.readText();
    console.log('剪切板内容:', text);
    return text;
  } catch (err) {
    console.error('读取剪切板失败:', err);
  }
}

// 检查剪切板权限
async function checkClipboardPermission() {
  const result = await navigator.permissions.query({ name: 'clipboard-read' });
  return result.state; // 'granted', 'denied', 'prompt'
}
```

### 2. 蓝牙 API (Web Bluetooth)
是 Web Bluetooth API 的入口，允许网页通过浏览器与附近的蓝牙低功耗设备进行通信。

**特点：**

+ 仅支持 BLE 设备（如智能手环、传感器、信标）
+ 不支持经典蓝牙（如蓝牙耳机、音箱）

**应用场景：**

+ 读取智能手环的心率、步数
+ 控制 BLE 灯、电机
+ 与 IoT 设备通信（温度、湿度传感器）
+ 与医疗设备交互（血糖仪、血压计）

```javascript
async function connectHeartRateDevice() {
  try {
    // 1. 请求蓝牙设备（过滤为"心率"设备）
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: ['heart_rate'] }] // 标准 UUID
    });

    // 2. 连接 GATT 服务器
    const server = await device.gatt.connect();
    console.log('✅ 已连接到 GATT 服务器');

    // 3. 获取心率服务
    const service = await server.getPrimaryService('heart_rate');

    // 4. 获取心率测量特征值（可通知）
    const characteristic = await service.getCharacteristic('heart_rate_measurement');

    // 5. 监听心率变化
    characteristic.addEventListener('characteristicvaluechanged', (event) => {
      const value = event.target.value;
      const heartRate = value.getUint8(1); // 解析数据
      console.log('💓 当前心率:', heartRate, 'bpm');
    });

    // 启用通知
    await characteristic.startNotifications();
    console.log('🔔 已开启心率通知');

  } catch (error) {
    console.error('❌ 蓝牙操作失败:', error);
  }
}

// 调用函数（必须由用户点击触发！）
document.getElementById('connectBtn').addEventListener('click', connectHeartRateDevice);
```

### 3. 地理位置 API (Geolocation)
```javascript
// 获取当前位置
navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log('纬度:', position.coords.latitude);
    console.log('经度:', position.coords.longitude);
    console.log('精度:', position.coords.accuracy);
  },
  (error) => {
    console.error('获取位置失败:', error.message);
  },
  {
    enableHighAccuracy: true, // 高精度模式
    timeout: 10000,           // 超时时间
    maximumAge: 60000         // 缓存位置有效期
  }
);

// 持续监听位置变化
const watchId = navigator.geolocation.watchPosition(
  (position) => {
    console.log('位置更新:', position.coords);
  }
);

// 停止监听
// navigator.geolocation.clearWatch(watchId);
```

### 4. 媒体设备 API (MediaDevices)
```javascript
// 获取媒体设备列表
async function getMediaDevices() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    devices.forEach(device => {
      console.log(`${device.kind}: ${device.label} (${device.deviceId})`);
    });
    return devices;
  } catch (error) {
    console.error('获取设备列表失败:', error);
  }
}

// 获取用户媒体（摄像头和麦克风）
async function getUserMedia() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: true
    });
    
    // 将流绑定到 video 元素
    const video = document.getElementById('video');
    video.srcObject = stream;
    
    return stream;
  } catch (error) {
    console.error('获取媒体流失败:', error);
  }
}

// 屏幕共享
async function shareScreen() {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true
    });
    return stream;
  } catch (error) {
    console.error('屏幕共享失败:', error);
  }
}
```

### 5. 网络信息 API (Connection)
```javascript
// 获取网络连接信息
function getNetworkInfo() {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  
  if (connection) {
    console.log('连接类型:', connection.effectiveType);
    console.log('下行速度:', connection.downlink + ' Mbps');
    console.log('往返时间:', connection.rtt + ' ms');
    console.log('数据节省模式:', connection.saveData);
    
    // 监听网络变化
    connection.addEventListener('change', () => {
      console.log('网络状态发生变化:', connection.effectiveType);
    });
    
    return connection;
  }
  
  return null;
}

// 检查在线状态
console.log('是否在线:', navigator.onLine);

// 监听网络状态变化
window.addEventListener('online', () => {
  console.log('网络已连接');
});

window.addEventListener('offline', () => {
  console.log('网络已断开');
});
```

### 6. 电池状态 API (Battery)
```javascript
async function getBatteryInfo() {
  if ('getBattery' in navigator) {
    try {
      const battery = await navigator.getBattery();
      
      console.log('电量:', Math.round(battery.level * 100) + '%');
      console.log('充电中:', battery.charging);
      console.log('充满时间:', battery.chargingTime);
      console.log('剩余使用时间:', battery.dischargingTime);
      
      // 监听电量变化
      battery.addEventListener('levelchange', () => {
        console.log('电量变化:', Math.round(battery.level * 100) + '%');
      });
      
      battery.addEventListener('chargingchange', () => {
        console.log('充电状态变化:', battery.charging);
      });
      
      return battery;
    } catch (error) {
      console.error('获取电池信息失败:', error);
    }
  } else {
    console.log('浏览器不支持 Battery API');
  }
}
```

### 7. 振动 API (Vibration)
```javascript
// 单次振动
function vibrateOnce() {
  if ('vibrate' in navigator) {
    navigator.vibrate(200); // 振动 200ms
  }
}

// 振动模式
function vibratePattern() {
  if ('vibrate' in navigator) {
    // 振动 300ms，暂停 100ms，再振动 300ms
    navigator.vibrate([300, 100, 300]);
  }
}

// 停止振动
function stopVibration() {
  if ('vibrate' in navigator) {
    navigator.vibrate(0);
  }
}
```

### 8. 存储管理 API (Storage)
```javascript
// 获取存储信息
async function getStorageInfo() {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    try {
      const estimate = await navigator.storage.estimate();
      console.log('已使用:', (estimate.usage / 1024 / 1024).toFixed(2) + ' MB');
      console.log('总配额:', (estimate.quota / 1024 / 1024).toFixed(2) + ' MB');
      console.log('使用率:', ((estimate.usage / estimate.quota) * 100).toFixed(2) + '%');
      return estimate;
    } catch (error) {
      console.error('获取存储信息失败:', error);
    }
  }
}

// 请求持久化存储
async function requestPersistentStorage() {
  if ('storage' in navigator && 'persist' in navigator.storage) {
    const isPersisted = await navigator.storage.persist();
    console.log('存储是否持久化:', isPersisted);
    return isPersisted;
  }
}
```

### 9. 用户代理检测 (User Agent)
```javascript
// 解析 User Agent
function parseUserAgent() {
  const ua = navigator.userAgent;
  
  return {
    isMobile: /Mobile|Android|iPhone|iPad/i.test(ua),
    isChrome: /Chrome/i.test(ua) && !/Edg/i.test(ua),
    isFirefox: /Firefox/i.test(ua),
    isSafari: /Safari/i.test(ua) && !/Chrome/i.test(ua),
    isEdge: /Edg/i.test(ua),
    isIE: /MSIE|Trident/i.test(ua)
  };
}

// 设备检测
function detectDevice() {
  return {
    platform: navigator.platform,
    maxTouchPoints: navigator.maxTouchPoints || 0,
    isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    language: navigator.language,
    languages: navigator.languages
  };
}
```

### 10. Beacon API (数据上报)
```javascript
// 发送 Beacon 数据（页面卸载时也可靠）
function sendBeaconData(url, data) {
  if (navigator.sendBeacon) {
    const success = navigator.sendBeacon(url, JSON.stringify(data));
    console.log('Beacon 发送结果:', success);
    return success;
  } else {
    // 降级方案
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      keepalive: true
    });
  }
}

// 使用示例
window.addEventListener('beforeunload', () => {
  sendBeaconData('/api/analytics', {
    event: 'page_unload',
    timestamp: Date.now()
  });
});
```

## 三、权限检测
```javascript
// 检查各种权限状态
async function checkPermissions() {
  const permissions = [
    'camera',
    'microphone',
    'geolocation',
    'notifications',
    'clipboard-read',
    'clipboard-write'
  ];
  
  for (const permission of permissions) {
    try {
      const result = await navigator.permissions.query({ name: permission });
      console.log(`${permission}: ${result.state}`);
    } catch (error) {
      console.log(`${permission}: 不支持或权限名称错误`);
    }
  }
}
```

## 四、兼容性检测
```javascript
// 功能检测函数
function featureDetection() {
  return {
    clipboard: 'clipboard' in navigator,
    bluetooth: 'bluetooth' in navigator,
    geolocation: 'geolocation' in navigator,
    mediaDevices: 'mediaDevices' in navigator,
    connection: 'connection' in navigator,
    vibration: 'vibrate' in navigator,
    storage: 'storage' in navigator,
    sendBeacon: 'sendBeacon' in navigator,
    getUserMedia: 'getUserMedia' in navigator.mediaDevices,
    share: 'share' in navigator
  };
}

// 使用示例
const supportedFeatures = featureDetection();
console.log('支持的浏览器功能:', supportedFeatures);
```





