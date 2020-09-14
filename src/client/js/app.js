//To Get The Data From The Server
const postData = async(url = '', data = {}) => {

    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });

    try {
        const newData = await res.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

const handleSubmit = (event) => {

    event.preventDefault();

    // check what text was put into the form field
    let destinationCity = document.getElementById('destination-city').value;
    let destinationCountry = document.getElementById('destination-country').value;
    let departdate = document.getElementById('departDate').value;

    console.log("::: Form Submitted :::");

    if (Client.checkForm()) {
        Client.postData('http://localhost:8000/addInfo', { destination: destinationCity, country: destinationCountry, departDate: departdate })
            .then((res) => {
                console.log(res);
                document.getElementById('tripinfo').classList.add('card');
                document.getElementById('city-image').src = res.cityImage;
                document.getElementById('triptitle').innerHTML = `${res.destination}, ${res.country}`;
                document.getElementById('trip-details').innerHTML = `Temprature: ${res.temp}
                <br>Weather Status: ${res.weatherStatus}
                <br>Depart Date: ${res.departDate}
                <br>Days Left: ${res.remainingDays}`;
                document.getElementById('delete-trip').classList.remove('invisible');
                document.getElementById('delete-trip').innerHTML = 'Delete';
            });
    } else {
        alert('One or More Fields are Empty\n Please, Enter All The Required Information');
    }
};

//Check if all fields are not empty
const checkForm = () => {
    let destination = document.getElementById('destination-city').value;
    let country = document.getElementById('destination-country').value;
    let departDate = document.getElementById('departDate').value;

    if (destination !== '' && country !== '' && departDate !== '') {
        console.log('true');
        return true;
    } else
        return false;
}

export { handleSubmit, postData, checkForm };