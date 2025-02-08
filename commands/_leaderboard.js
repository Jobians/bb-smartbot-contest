/*CMD
  command: /leaderboard
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

let leaderboard = TopBoardLib.getBoard('quiz');
let userId = user.telegramid;

const titles = smartBot.langData.titles.leaderboard;
const nameMaxLength = 15;

let leaderboardText = titles.no_leaderboard;
let userRankText = "";
let ranksText = "";

let userPoints = User.getProp(TopBoardLib.getUserPropName('quiz'), 0);

if (leaderboard.length > 0) {
  leaderboardText = `${titles.title}\n\n`;

  let userRank = -1;
  let lowestBoardScore = leaderboard[leaderboard.length - 1].value;

  leaderboard.forEach((entry, index) => {
    let medal = ["🥇", "🥈", "🥉", "🏅", "🎖️"][index] || `${index + 1}.`;

    let name = entry.username
      ? `@${entry.username}`
      : entry.first_name
        ? entry.first_name.length > nameMaxLength
          ? entry.first_name.slice(0, nameMaxLength) + "…"
          : entry.first_name
        : "Unknown";
      
      ranksText += titles.ranks
      .replace("{medal}", medal)
      .replace("{name}", name)
      .replace("{points}", entry.value) + "\n";

    if (entry.tgId === userId) {
      userRank = index + 1;
      userRankText = titles.user_rank.replace("{rank}", userRank).replace("{points}", entry.value);

      if (userRank > 1) {
        let pointsToTop = leaderboard[0].value - entry.value;
        pointsToTop = pointsToTop <= 0 ? 1 : pointsToTop;
        userRankText += "\n" + titles.close_to_top.replace("{points_needed}", pointsToTop);
      } else {
        userRankText += "\n" + titles.top_champion;
      }
    }
  });

  if (userRank === -1 && userPoints > 0) {
    let pointsNeeded = Math.max(0, lowestBoardScore + 1 - userPoints);
    userRankText = titles.not_ranked_yet.replace("{user_points}", userPoints).replace("{points_needed}", pointsNeeded);
  }
}

if (userPoints === 0) {
  userRankText = titles.no_points;
}

smartBot.add({
  leaderboardText: leaderboardText,
  ranks: ranksText,
  userRankText: userRankText
});
