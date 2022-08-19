const axios = require("axios");

// const appid = 'wx3a426761d23d42b3'
const appid = "wxc7d4b27d21d142d6";

// const app_screct = 'AAQ9G7sEAAABAAAAAADWcttanYP2j10WlDD+YiAAAAAraAdzKm8i8JwFJ68cDOJBtIHsmv3F8e00LCv7f+tYvlGHOmrBarkElb9EIUCyp6QZ/Ky7vD8IAq1ghjCX7KS74kNcXa5LLZiKDzzQQB8XykmyqiaOqma6v6Y/LZjuU+2/jTVellaAO+oYWdJYRXPwWvyVNkrwNbWBzQ=='
const app_screct = "d1b94f11904d5aee13e5fb338b7423af";

// axios.default.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${app_screct}`).then(res => {
//     console.log('res', res.data)
// }).catch(err => {
//     console.log('err', err)
// })

const token =
  "59_FrPBeMRuL1sa_MsTVECBHOf5UDFi_Toar7PBxz5nzCVRfoLYY32MCA_VtbK4ww4OgF87IghUT9QHHaa9JM3bK496Ud6bjdjAknfIgJklCy6IIbLaojC4PRuiQMXaFHTUH6miL3ZZqfn8uyEyBCDcAGAXYZ";

  const template_id = 'xyZDJ6-Gis5_0D7BuKiX1vvJz6sF2zGygBX-ko6xg3I'

axios.default.post(
  `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${token}`,
  {
    touser: "om-Vy6LZYbzca6xKghw6sBmyVi94",
    template_id,
    url: "http://weixin.qq.com/download",
    topcolor: "#FF0000",
    data: {
      User: {
        value: "巧欣欣",

        color: "#173177",
      },

      Date: {
        value: "06月07日 19时24分",

        color: "#173177",
      },

      city: {
        value: "北京",

        color: "#173177",
      },

      weather: {
        value: "晴天",

        color: "#173177",
      },

      min_temperature: {
        value: "10",

        color: "#173177",
      },

      max_temperature: {
        value: "10",

        color: "#173177",
      },

      pop: {
        value: "0",

        color: "#173177",
      },
      tips: {
        value: "hahahah",
        color: "#173177"
      }
    },
  }
).then(res => {
    console.log('res', res.data)
}).catch(err => {
    console.log(err)
});
