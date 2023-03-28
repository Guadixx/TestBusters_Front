import './FrequentQuestions.css';

const FrequentQuestions = () => {
  return (
    <div className="questions_container">
      <div className="questionUser_container">
        <h1>Welcome User 👋🏾</h1>
      </div>
      <div className="questionAnswer_container">
        <h4>
          {' '}
          We know our web can be confusing at times, so here we leave you a full section
          of frequently asked questions!
        </h4>
      </div>
      <div className="questionF_container">
        <h2>What is the difference between a Generic Test and a Featured Test?💡</h2>
        <h4>Featured Test</h4>
        <p>TestBusters is a test devoted to the fun and learning of our users.</p>
        <p>
          {' '}
          Thats why we offer different databases that can offer you different topic
          choices for example Dinosaurs, Countries, Movies, etc. The point of creating a
          Featured Test is that we provide the information while you create the fun! You
          can choose any database of your liking and create the questions and asnwers of
          your choice.
        </p>
      </div>
      <div className="questionG_container">
        <h4>Generic Tests</h4>
        <p>
          {' '}
          What we offer in this creating section is the possibility for the usser to
          upload and create its own database. You can choose your own topic, your own
          pictures, your own questions and answers. You are basicaly the signed creator of
          the test! You can personalize it anyway you prefer and choose any topic or theme
          you like!
        </p>
      </div>
    </div>
  );
};

export default FrequentQuestions;
