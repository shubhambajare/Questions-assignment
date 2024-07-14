const QuestionCard = (props: { id: string, question: string, handleRadioButtonClick: Function }) => {


    const radioButtonClick = (value: string) => {
        props.handleRadioButtonClick(props.id, value)
    }

    return (
        <div className="card">
            <div className="question">
                {props.id}. {props.question}
            </div>
            <div className="question-options">
                <input type="radio" value="YES" name={props.question} onClick={() => radioButtonClick("YES")} /> YES
                <br />
                <input type="radio" value="NO" name={props.question} onClick={() => radioButtonClick("NO")} /> NO
            </div>
        </div>
    )
}

export default QuestionCard;