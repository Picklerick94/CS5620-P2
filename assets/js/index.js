const fetchAllStudents = async () => {
  const res = await fetch("/api/students");
  return await res.json();
};

const displayContent = async () => {
  const content = document.querySelector(".content");

  const loadingNotice = document.createElement("div");
  loadingNotice.className = "notice";
  loadingNotice.innerHTML = `
    Loading...
  `;

  content.appendChild(loadingNotice);

  const students = await fetchAllStudents();

  const tweets = students.map((student) => {
    const allTweets = student.tweets;
    const mostRecentTweet = allTweets.reduce((mostRecent, tweet) =>
      mostRecent.created_at > tweet.created_at ? mostRecent : tweet
    );
    const dateTime = new Date(mostRecentTweet.created_at);
    return {
      name: student.name,
      NUID: student.NUID,
      twitterAccount: "@" + student.twitterAccount,
      dateTime:
        dateTime.toLocaleString("default", {
          month: "short",
          day: "numeric",
        }) +
        " " +
        dateTime.toLocaleString("default", {
          timeStyle: "medium",
        }),
      content: mostRecentTweet.text,
      studentId: student._id,
    };
  });

  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

  if (tweets.length === 0) {
    const emptyNotice = document.createElement("div");
    emptyNotice.className = "notice";
    emptyNotice.innerHTML = `
      No available tweets.
    `;

    content.appendChild(emptyNotice);
  }

  tweets.forEach((tweet) => {
    const contentCard = document.createElement("div");

    contentCard.className = "content-card";
    contentCard.innerHTML = `
      <div class="personal-info">
        <img src="img/avatar-tweet.png" alt="The profile image for the twitter user.">
        <div class="info-list">
          <div class="first-row">
            <span class="student-name">${tweet.name}</span>
            <span class="nuid">${"NUID " + tweet.NUID}</span>
          </div>
          <div class="second-row">
            <span class="twitter-handle">${tweet.twitterAccount}</span>
          </div>
        </div>
      </div>
      <div class="date-time">${tweet.dateTime}</div>
      <div class="tweet-content">${tweet.content}</div>  
      <div class="operation">
        <a class="detail-link" href="./student/${tweet.studentId}">Detail</a>
        <button class="operation-button">Edit</button>
        <button class="operation-button">Delete</button>
      </div>
    `;

    content.appendChild(contentCard);
    content.appendChild(contentCard);
  });
};

displayContent();

const createButton = document.querySelector("#create-button");
const modal = document.querySelector(".modal");

createButton.addEventListener("click", () => {
  modal.style.display = "block";
});

modal.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

const cancelButton = document.querySelector(".cancel-button");

cancelButton.addEventListener("click", (event) => {
  modal.style.display = "none";
});

const createStudentForm = document.querySelector(".create-student-form");
const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);

  const tweet = tweets.find(
    (tweet) => tweet.twitterHandle === formProps.twitterHandle
  );
  tweet.nuid = formProps.nuid;
  tweet.legalName = formProps.legalName;
  displayContent();
  createStudentForm.reset();
  modal.style.display = "none";
};

createStudentForm.addEventListener("submit", handleSubmit);
