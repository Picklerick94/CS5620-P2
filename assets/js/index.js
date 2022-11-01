const createNewStudent = async ({ name, nuid, twitterAccount }) => {
  return await fetch("/api/student", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      NUID: nuid,
      twitterAccount,
    }),
  });
};

const fetchAllStudents = async () => {
  const res = await fetch("/api/students");
  return await res.json();
};

const editStudent = async ({ id, name, nuid }) => {
  return await fetch("/api/students/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      NUID: nuid,
    }),
  });
};

const deleteStudent = async (id) => {
  return await fetch("/api/students/" + id, {
    method: "DELETE",
  });
};

const editModal = document.querySelector(".edit-modal");

editModal.addEventListener("click", (event) => {
  if (event.target == editModal) {
    editModal.style.display = "none";
  }
});

const editStudentForm = document.querySelector(".edit-student-form");

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
        <button class="operation-button edit-button" data-studentid=${
          tweet.studentId
        } data-name=${encodeURIComponent(tweet.name)} data-nuid=${tweet.NUID}>
          Edit
        </button>
        <button class="operation-button delete-button" data-studentid=${
          tweet.studentId
        }>Delete</button>
      </div>
    `;

    content.appendChild(contentCard);
  });

  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const studentId = e.target.getAttribute("data-studentid");
      await deleteStudent(studentId);
      await displayContent();
    });
  });

  const editButtons = document.querySelectorAll(".edit-button");
  editButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      editModal.style.display = "block";
      const id = e.target.getAttribute("data-studentid");
      const name = decodeURIComponent(e.target.getAttribute("data-name"));
      const nuid = e.target.getAttribute("data-nuid");
      editStudentForm.elements["name"].value = name;
      editStudentForm.elements["nuid"].value = nuid;
      editStudentForm.elements["id"].value = id;
    });
  });
};

displayContent();

const createButton = document.querySelector("#create-button");
const createModal = document.querySelector(".create-modal");

createButton.addEventListener("click", () => {
  createModal.style.display = "block";
});

createModal.addEventListener("click", (event) => {
  if (event.target == createModal) {
    createModal.style.display = "none";
  }
});

const cancelButtons = document.querySelectorAll(".cancel-button");

cancelButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    createModal.style.display = "none";
    editModal.style.display = "none";
  });
});

const createStudentForm = document.querySelector(".create-student-form");
createStudentForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);

  await createNewStudent(formProps);
  createStudentForm.reset();
  createModal.style.display = "none";
  await displayContent();
});

editStudentForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);

  await editStudent(formProps);
  editStudentForm.reset();
  editModal.style.display = "none";
  await displayContent();
});
