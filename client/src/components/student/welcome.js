const Welcome = (props) => {
    return ( <div className="welcome">
        <br/> <br/>
        <h2>Hello {props.data.student.name},</h2>
        <br/>
        <h4>Welcome to Yoga Class Planer Application </h4> <br/>
        <p>This app let you to focus on health with yoga management.
            Keep exploring....
        </p>
    </div>  );
}
 
export default Welcome;