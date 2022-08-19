const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { init: initDB, Counter } = require("./db");
const request = require("request");
const logger = morgan("tiny");
const cloud = require('./cloud')

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger);

function sendmess(mess, req) {
  const appid = req.headers['x-wx-from-appid'] || "wx3a426761d23d42b3";
  const wxapp = req.headers['x-wx-from-appid'] || 'wxa53148d70155d8b7'

  return new Promise((resolve, reject) => {
    request(
      {
        method: "POST",
        url: `http://api.weixin.qq.com/cgi-bin/message/custom/send?from_appid=${wxapp}`,
        headers: req.headers,
        body: JSON.stringify(mess),
      },
      function (error, response) {
        if (error) {
          console.log("接口返回错误", error);
          reject(error.toString());
        } else {
          console.log("接口返回内容", response.body);
          resolve(response.body);
        }
      }
    );
  });
}

// 首页
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/send", async (req, res) => {
  const appid = req.headers["x-wx-from-appid"] || "";
  const { ToUserName, FromUserName = 'olcUmwTiSLjNiS6XAgGgpBE-QF64', MsgType, Content, CreateTime } = req.body;
  console.log(appid, req.body);

  sendmess({
    touser: 'FromUserName',
    is_to_all: true,
    msgtype: "link",
    link: {
      title: "Relax｜今日推荐音乐",
      description: "每日推荐一个好听的音乐，感谢收听～",
      thumb_url:
        "https://y.qq.com/music/photo_new/T002R300x300M000004NEn9X0y2W3u_1.jpg?max_age=2592000", // 支持JPG、PNG格式，较好的效果为大图360*200，小图200*200
      url: "https://c.y.qq.com/base/fcgi-bin/u?__=0zVuus4U",
    },
  }, req);
});


app.post('/message', (req, res) => {
  const { MsgType, Content } = req.body;

  console.log('= message =', MsgType, Content)

  res.send({
    code: 0,
    data: 'hello message'
  })
})

// 更新计数
app.post("/api/count", async (req, res) => {
  const { action } = req.body;
  if (action === "inc") {
    await Counter.create();
  } else if (action === "clear") {
    await Counter.destroy({
      truncate: true,
    });
  }

  res.send({
    code: 0,
    data: await Counter.count(),
  });
});

// 获取计数
app.get("/api/count", async (req, res) => {
  const result = await Counter.count();
  res.send({
    code: 0,
    data: result,
  });
});

// 小程序调用，获取微信 Open ID
app.get("/api/wx_openid", async (req, res) => {
  if (req.headers["x-wx-source"]) {
    res.send(req.headers["x-wx-openid"]);
  }
  res.send({
    code: -1,
    data: null
  })
});

const port = process.env.PORT || 80;

async function bootstrap() {
  // await initDB();
  app.listen(port, () => {
    console.log("启动成功", port);
  });
}

bootstrap();
