import './NotFound.css';

function NotFound() {
  return (
    <div className="notFound_container">
      <div className="notfound_container">
        <h3>404 Not Found</h3>
      </div>
      <div className="message_container">
        <h4> Sorry!! looks like the page you are looking for doesnt exist. </h4>
        <h4>Try again with a different one!</h4>
      </div>
    </div>
  );
}

export default NotFound;
