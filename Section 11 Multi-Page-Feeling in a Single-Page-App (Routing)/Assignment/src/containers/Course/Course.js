import React from 'react';

const Course = (props) => {
    console.log(props)
    let param
    const query = new URLSearchParams(props.location.search)
    for (param of query.entries()) {
        console.log('param', param[1]);
        param = param[1]
        console.log('param2', param);
    }
    console.log(query)
    console.log(param)
    return (
        <div>
            <h1>{param}</h1>
            <p>You selected the Course with ID:{props.match.params.courseId}</p>
        </div>
    );

}
export default Course;


// componentDidMount() {
//     const query = new URLSearchParams(this.props.location.search);
//     for (let param of query.entries()) {
//         console.log(param); // yields ['start', '5']
//     }
// }