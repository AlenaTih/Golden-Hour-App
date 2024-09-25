import {
        useState,
        useEffect,
        ChangeEvent,
        MouseEvent
    } from "react"
import axios from "axios"

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

    const [isButtonClicked, setIsButtonClicked] = useState(false)

    const apiKey = "8af606c0008cbd969fafbea21b7c4ab6" // My OpenWeatherMap API key

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

        setIsButtonClicked(true)

        // Calculate the timezone offset of the user's system from UTC
        // (Universal Coordinated Time) in hours
        const userTimeZone = new Date().getTimezoneOffset() / 60
        console.log(userTimeZone)

        const currentTime = new Date().getHours()
        console.log(currentTime)
    }

    // useEffect(() => {
    //     navigator.geolocation.getCurrentPosition(position => {
    //         setLocation({
    //             longitude: position.coords.longitude,
    //             latitude: position.coords.latitude,
    //         })
    //     })

    //     // console.log(location)
    // }, [])

    // Refactor this useEffect to maybe not use an async function
    useEffect(() => {
        const fetchLocationData = async () => {
            try {
              const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${formData.city}&limit=1&appid=${apiKey}`)
              
              if (response.data.length > 0) {
                const { lat, lon } = response.data[0]
                console.log(lat, lon)
                setLocation({ latitude: lat, longitude: lon })
              } else {
                alert("This city is not found")
              }
            } catch (error) {
              console.error("Error fetching data:", error)
            }
          }

          if (isButtonClicked) {
            fetchLocationData()
          }
    }, [formData.city, isButtonClicked])

    useEffect(() => {
        // Use the longitude and latitude to get the sunset time from the OpenWeatherMap API
        if (location.latitude > 0 && location.longitude > 0) {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}`
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const unixSunsetTime = data.sys.sunset
                    const date = new Date(unixSunsetTime * 1000) // Convert from seconds to milliseconds
                    const sunsetTimeInHours = date.getHours()
                    console.log(sunsetTimeInHours)
                    setSunsetTime(sunsetTimeInHours)
                })
                .catch(error => {
                    console.error(error)
                })
                .finally(() => {
                    console.log("It worked!")
                    setIsButtonClicked(false) // Reset the button click state
                })
        }

        // return () => {
        //     console.log("Clean up")
        // }

    }, [location])

    return (
        <div className="golden-hour">
            <p className="golden-hour-text">
                Golden hour is the time during 1 hour before sunset. 
                You can take the most awesome photos during this time, 
                and just get pleasure watching the colors of the sky.
            </p>

            <p className="golden-hour-text">
                Find out when you can see the golden hour in your city.
            </p>

            <form className="golden-hour-form">
                <label
                    className="city-label"
                    htmlFor="city-input">
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
                {sunsetTime > 0 && goldenHourTime > 0 && (
                    <p className="golden-hour-result-text">
                        You can see the golden hour 
                        from {goldenHourTime} to {sunsetTime}
                    </p>)}
                {formData.city && (
                    <p className="golden-hour-result-text">
                        in {formData.city}
                </p>)}
            </div>
        </div>
    )
}

export default GoldenHour
