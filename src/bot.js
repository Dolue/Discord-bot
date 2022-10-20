require("dotenv").config();

const { Client } = require("discord.js");
const client = new Client({
  partials: ["MESSAGE", "REACTION"],
});
const PREFIX = "$";

client.on("ready", () => {
  console.log(`${client.user.tag} has logged in.`);
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);
    if (CMD_NAME === "kick") {
      if (message.member && message.member.hasPermission("KICK_MEMBERS"))
        return message.reply("You do not have permissions to use that command");
      if (args.length === 0) return message.reply("Provide ID");
      const member = message.guild.members.cache.get(args[0]);
      if (member) {
        member
          .kick()
          .then((member) => message.channel.send(`${member} was kicked out`))
          .catch((err) => message.channel.send("I do not have permission :("));
      } else {
        message.channel.send("That member was not found");
      }
    } else if (CMD_NAME === "ban") {
      if (message.member && message.member.hasPermission("BAN_MEMBERS"))
        return message.reply("You do not have permissions to use that command");
      if (args.length === 0) return message.reply("Provide ID");

      try {
        const user = await message.guild.members.ban(args[0]);
        message.channel.send("user was banned");
      } catch (err) {
        message.channel.send("An error occured");
      }
    }
  }
});

client.on("messageReactionAdd", (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === "") {
    switch (name) {
      case ":apple:":
        member.roles.add("");
        break;

      case ":banana:":
        member.roles.add("");
        break;
      case ":grape:":
        member.roles.add("");
        break;
      case ":mango:":
        member.roles.add("");
        break;
    }
  }
});

client.on("messageReactionRemove", (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === "") {
    switch (name) {
      case ":apple:":
        member.roles.remove("");
        break;

      case ":banana:":
        member.roles.remove("");
        break;
      case ":grape:":
        member.roles.remove("");
        break;
      case ":mango:":
        member.roles.remove("");
        break;
    }
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
