module.exports = {
  config: {
    name: "join",
    aliases: ['addme', 'joinme'],
    version: "1.0",
    author: "Samir B. Thakuri",
    countDown: 5,
    role: 2,
    shortDescription: {
      en: "Add user to support group",
    },
    longDescription: {
      en: "This command adds the user to the group wher bot exist",
    },
    category: "owner",
    guide: {
      en: "To use this command, simply type !join <threadID>.",
    },
  },

  onStart: async function ({ api, args, message, event }) {
    const supportGroupId = args[0];
    if (!supportGroupId) {
      api.sendMessage("𝑉𝐸𝐼𝐿𝐿𝐸𝑍 𝐴𝐽𝑂𝑈𝑇𝐸𝑅 𝙸𝙳 𝙳𝚄 𝙶𝚁𝙾𝚄𝙿𝙴.....🔴.", event.threadID);
      return;
    }
    const threadID = event.threadID;
    const userID = event.senderID;
    const threadInfo = await api.getThreadInfo(supportGroupId);
    const participantIDs = threadInfo.participantIDs;
    if (participantIDs.includes(userID)) {
      api.sendMessage(
        "𝙱𝙾𝚂𝚂.....𝚅𝙾𝚄𝚂 𝙴𝚃𝙴𝚂 𝙳𝙴𝙹𝙰 𝙳𝙰𝙽𝚂  𝙻𝙴 𝙶𝚁𝙾𝚄𝙿𝙴🍀𝚅𝙴𝚁𝙸𝙵𝙸𝙴𝚁 𝚅𝙾𝚃𝚁𝙴 𝙱𝙾𝙸𝚃𝙴 𝙳𝙴 𝙼𝙴𝚂𝚂𝙰𝙶𝙴.....🍷",
        threadID
      );
    } else {
      api.addUserToGroup(userID, supportGroupId, (err) => {
        if (err) {
          console.error("🔴| Failed to add user to support group:", err);
          api.sendMessage("𝙶𝚁𝙾𝚄𝙿𝙴 𝙸𝙽𝚃𝚁𝙾𝚄𝚅𝙰𝙱𝙻𝙴......🙅𝔙𝔢𝔲𝔦𝔩𝔩𝔢𝔷 𝔪'𝔶 𝔞𝔧𝔬𝔲𝔱𝔢𝔯 𝔭𝔲𝔦𝔰 𝔯𝔢𝔢𝔰𝔰𝔞𝔶𝔢𝔯...🍷", threadID);
        } else {
          api.sendMessage(
            "𝙱𝙾𝚂𝚂....𝚅𝙾𝚄𝚂 𝔞𝔳𝔢𝔷 𝔢𝔱𝔢 𝔞𝔧𝔬𝔲𝔱𝔢 𝔞𝔲 𝔤𝔯𝔬𝔲𝔭𝔢🔴.",
            threadID
          );
        }
      });
    }
  },
