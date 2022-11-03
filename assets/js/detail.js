const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const studentId = params.id;

const fetchAllTweets = async () => {
  const res = await fetch("/api/students/" + studentId);
  return await res.json();
};
/*
  It's a pratical app and I believe John would love it

  You may also want to check the following function since I found the "Missed Deadlines number are not correct sometimes."
*/

const displayContent = async () => {
  const infoSection = document.querySelector(".info-section");
  infoSection.style.display = "none";
  const tweetSection = document.querySelector(".tweet-section");
  tweetSection.style.display = "none";

  const container = document.querySelector(".container");

  const loadingNotice = document.createElement("div");
  loadingNotice.className = "notice";
  loadingNotice.innerHTML = `
    Loading...
  `;

  container.appendChild(loadingNotice);

  const allTweets = (await fetchAllTweets())[0];

  container.removeChild(loadingNotice);
  infoSection.style.display = "flex";
  tweetSection.style.display = "flex";

  const totalCount = document.querySelector("#total-tweets-count");
  totalCount.innerHTML = allTweets.tweets.length;

  const studentInfo = document.querySelector("#student-info");
  studentInfo.innerHTML = allTweets.name + " NUID " + allTweets.NUID;

  const twitterHandle = document.querySelector("#twitter-handle");
  twitterHandle.innerHTML = "@" + allTweets.twitterAccount;

  const content = document.querySelector(".tweets");

  if (allTweets.tweets.length === 0) {
    const emptyNotice = document.createElement("div");
    emptyNotice.className = "empty-notice";
    emptyNotice.innerHTML = `
      No available tweets.
    `;

    content.appendChild(emptyNotice);
  }

  let missedTweetCount = 0;

  const startDate = new Date("September 13, 2022 13:00:00");
  const endDate = new Date();

  for (let date = startDate; date < endDate; date.setDate(date.getDate() + 7)) {
    let dueDate = new Date(date);
    dueDate.setDate(date.getDate() + 7);

    const tweet = allTweets.tweets.find((tweet) => {
      const dateTime = new Date(tweet.created_at);
      return dateTime >= date && dateTime < dueDate;
    });

    if (tweet) {
      const oneTweet = document.createElement("div");
      const dateTime = new Date(tweet.created_at);

      oneTweet.className = "one-tweet";
      oneTweet.innerHTML = `
      <span class="date-time">${dateTime.toLocaleString("default", {
        month: "short",
        day: "numeric",
      }) +
        " " +
        dateTime.toLocaleString("default", {
          timeStyle: "medium",
        })
        }</span>
      <span class="deadline-date-time">
        Post deadline:
        <span>${dueDate.toLocaleString("default", {
          month: "short",
          day: "numeric",
        }) +
        " " +
        dueDate.toLocaleString("default", {
          timeStyle: "medium",
        })
        }</span>
      </span>
      <span class="content-title">Content</span>
      <span class="content">
        ${tweet.text}
      </span>
    `;

      content.appendChild(oneTweet);
    } else {
      missedTweetCount++;
    }
  }

  const missedCount = document.querySelector("#missed-tweets-count");
  missedCount.innerHTML = missedTweetCount;
};

displayContent();
