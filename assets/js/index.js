const tweets = [
  {
    username: "Yixiang Xie",
    twitterHandle: "@YixiangXie4",
    content:
      "Repainting is triggered each time real DOM is updated, and it becomes slow when there're too many nodes. React keeps a virtual DOM and updates it first, and chooses the right time to update real DOM. This reduces repainting and gains better performance.\n#WebDev @NortheasternCA",
    dateTime: "Oct 25 02:21:31",
    nuid: "",
    legalName: "",
  },
  {
    username: "Han Deng",
    twitterHandle: "@Cleoraaaa",
    content:
      "Week7 React has a concept of Virtual DOM. When there is a difference which occurs between VirtualDOM and real HTML DOM, changes are pushed to the realDOM. This is what makes it fast. #webdev @NortheasternCA",
    dateTime: "Oct 25 03:51:13",
    nuid: "",
    legalName: "",
  },
  {
    username: "Lingyi_Zheng",
    twitterHandle: "@LingyiZheng2",
    content:
      "I found out express session can provide cookies that operate login interception. For example, it could set the restricted time period for users to login to homepage, so that user are asked to log in again after specific time period #WebDev @NortheasternCA",
    dateTime: "Oct 25 01:23:19",
    nuid: "",
    legalName: "",
  },
  {
    username: "Yi Zhou",
    twitterHandle: "@YiZhou88874392",
    content:
      'In MVC, data flows in no single direction and makes it hard to track the exact location of a state when the architecture gets complicated. Facebook released Flux to simplify the data flow to single directional by cashing and handling data with a "store"\n#WebDev @NortheasternCA',
    dateTime: "Oct 25 01:19:21",
    nuid: "",
    legalName: "",
  },
  {
    username: "Zhiyi Jin",
    twitterHandle: "@victoryjzy",
    content:
      "React fully leverages the capabilities of the JS language itself to write the UI, rather than making wheels to enhance the functionality of HTML. #WebDev @NortheasternCA",
    dateTime: "Oct 25 01:09:18",
    nuid: "",
    legalName: "",
  },
  {
    username: "Xingjian Bi",
    twitterHandle: "@HarryBi17",
    content:
      "#WebDev @NortheasternCA I’m amazed by the idea of react virtual DOM where stores in the memory. It’s lite weight and cheap to create. We can change our state of the component to update the virtual DOM and it will automatically update the browser DOM.",
    dateTime: "Oct 25 01:09:18",
    nuid: "",
    legalName: "",
  },
];

const content = document.querySelector(".content");

const displayContent = () => {
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

  tweets.forEach((tweet) => {
    const contentCard = document.createElement("div");
    contentCard.className = "content-card";

    const personalInfo = document.createElement("div");
    personalInfo.className = "personal-info";

    const img = document.createElement("img");
    img.src = "img/avatar-tweet.png";
    img.alt = "The profile image for the twitter user.";
    personalInfo.appendChild(img);

    const infoList = document.createElement("div");
    infoList.className = "info-list";

    const firstRow = document.createElement("div");
    firstRow.className = "first-row";

    const studentName = document.createElement("span");
    studentName.className = "student-name";
    studentName.appendChild(
      document.createTextNode(tweet.legalName || tweet.username)
    );
    firstRow.appendChild(studentName);

    const nuid = document.createElement("span");
    nuid.className = "nuid";
    nuid.appendChild(
      document.createTextNode(tweet.nuid ? "NUID" + tweet.nuid : "")
    );
    firstRow.appendChild(nuid);
    infoList.appendChild(firstRow);

    const secondRow = document.createElement("div");
    secondRow.className = "second-row";

    const twitterHandle = document.createElement("span");
    twitterHandle.className = "twitter-handle";
    twitterHandle.appendChild(document.createTextNode(tweet.twitterHandle));
    secondRow.appendChild(twitterHandle);
    infoList.appendChild(secondRow);
    personalInfo.appendChild(infoList);
    contentCard.appendChild(personalInfo);

    const dateTime = document.createElement("div");
    dateTime.className = "date-time";
    dateTime.appendChild(document.createTextNode(tweet.dateTime));
    contentCard.appendChild(dateTime);

    const tweetContent = document.createElement("div");
    tweetContent.className = "tweet-content";
    tweetContent.appendChild(document.createTextNode(tweet.content));
    contentCard.appendChild(tweetContent);

    if (tweet.legalName) {
      const operation = document.createElement("div");
      operation.className = "operation";

      const detail = document.createElement("button");
      detail.className = "operation-button";
      detail.appendChild(document.createTextNode("Detail"));
      operation.appendChild(detail);

      const edit = document.createElement("button");
      edit.className = "operation-button";
      edit.appendChild(document.createTextNode("Edit"));
      operation.appendChild(edit);

      const deleteButton = document.createElement("button");
      deleteButton.className = "operation-button";
      deleteButton.appendChild(document.createTextNode("Delete"));
      operation.appendChild(deleteButton);

      contentCard.appendChild(operation);
    }

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
