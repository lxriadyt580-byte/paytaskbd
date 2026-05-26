const {Telegraf} = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx)=>{
  ctx.reply("💸 Pay Task BD Cash PRO",{
    reply_markup:{
      inline_keyboard:[[
        {text:"🚀 Open App",web_app:{url:process.env.WEBAPP_URL}}
      ]]
    }
  });
});

bot.launch();
