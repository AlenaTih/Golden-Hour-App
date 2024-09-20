import { useState, ChangeEvent, MouseEvent } from "react"

function GoldenHour() {
    const [formData, setFormData] = useState({
        location: "",
    })

    const [goldenHourTime, setGoldenHourTime] = useState(7)

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target

        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value,
            }
        })
    }

    function handleButtonClick(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault()

        // Calculate the timezone offset of the user's system from UTC
        // (Universal Coordinated Time) in hours
        const userTimeZone = new Date().getTimezoneOffset() / 60
        console.log(userTimeZone)

        const currentTime = new Date().getHours()
        console.log(currentTime)
    }

    return (
        <div className="golden-hour">
            <h2 className="golden-hour-title">
                Golden Hour App
            </h2>

            <form className="golden-hour-form">
                <label htmlFor="location-input">
                    Type in your location
                    <input
                        className="location-input"
                        id="location-input"
                        type="text"
                        placeholder="Your city"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </label>

                <button
                    className="golden-hour-submit-button"
                    onClick={handleButtonClick}>
                        Submit
                </button>
            </form>

            <div className="golden-hour-result-container">
                <p className="golden-hour-result-text">
                    You can see the golden hour at {goldenHourTime} pm
                    {/* {goldenHourTime > 12 ? "pm" : "am"} */}
                </p>
                {formData.location && (<p>
                    in {formData.location}
                </p>)}
            </div>
        </div>
    )
}

export default GoldenHour
