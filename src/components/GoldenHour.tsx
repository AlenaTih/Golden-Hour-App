import {
        useState,
        useEffect,
        ChangeEvent,
        MouseEvent
    } from "react"
// import axios from "axios"

function GoldenHour() {
    const [formData, setFormData] = useState({
        city: "",
    })

    const [sunsetTime, setSunsetTime] = useState(0)

    const goldenHourTime = sunsetTime - 1

    const [location, setLocation] = useState({
        longitude: 0,
        latitude: 0,
    })

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

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setLocation({
                longitude: position.coords.longitude,
                latitude: position.coords.latitude,
            })
        })

        console.log(location)
    }, [])

    // useEffect(() => {
    //     async () => {
    //         try {
    //           const apiKey = "YOUR_API_KEY" // Replace with your OpenWeatherMap API key
    //           const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${formData.city}&limit=1&appid=${apiKey}`)
              
    //           if (response.data.length > 0) {
    //             const { lat, lon } = response.data[0]
    //             setLocation({ latitude: lat, longitude: lon })
    //           } else {
    //             alert("City not found")
    //           }
    //         } catch (error) {
    //           console.error("Error fetching data:", error)
    //         }
    //       }
    // }, [])

    // useEffect(() => {
    //     // Use the longitude and latitude to get the sunset time from the OpenWeatherMap API
    //     const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${location.latitude}&lon=${location.longitude}&exclude=minutely,hourly,alerts&appid=${API key}`

    //     fetch(url)
    //         .then(response => response.json())
    //         .then(data => {
    //             const unixSunsetTime = data.current.sunset
    //             const date = new Date(unixSunsetTime * 1000) // Convert from seconds to milliseconds
    //             const sunsetTimeInHours = date.getHours()
    //             setSunsetTime(sunsetTimeInHours)
    //         })
    //         .catch(error => {
    //             console.error(error)
    //         })
    //         .finally(() => {
    //             console.log("It worked!")
    //         })

    //     return () => {
    //         console.log("Clean up")
    //     }

    // }, [formData.city])

    return (
        <div className="golden-hour">
            <h2 className="golden-hour-title">
                Golden Hour App
            </h2>

            <form className="golden-hour-form">
                <label htmlFor="city-input">
                    Type in your city
                    <input
                        className="city-input"
                        id="city-input"
                        type="text"
                        placeholder="Your city"
                        name="city"
                        value={formData.city}
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
                {sunsetTime && goldenHourTime &&
                    (<p className="golden-hour-result-text">
                        You can see the golden hour at {goldenHourTime} pm
                        - {sunsetTime} pm
                    </p>)}
                {formData.city && (<p>
                    in {formData.city}
                </p>)}
            </div>
        </div>
    )
}

export default GoldenHour
