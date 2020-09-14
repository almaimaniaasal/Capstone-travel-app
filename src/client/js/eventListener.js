import { handleSubmit } from './app';
//To delete a trip
const deleteTrip = document.getElementById('delete-trip').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('tripinfo').classList.remove('card');
    document.getElementById('city-image').src = '';
    document.getElementById('triptitle').innerHTML = '';
    document.getElementById('trip-details').innerHTML = '';
    document.getElementById('delete-trip').innerHTML = '';
    document.getElementById('delete-trip').classList.add('invisible');
    document.getElementById('form').reset();
});

document.getElementById("addtrip").addEventListener("click", handleSubmit);

export { deleteTrip };