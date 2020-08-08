export default function convertHourToMinutes(time: string)
{
    //Percorre a string, converte em number, armazena os valor da hora e do minuto
    const [hour, minutes] = time.split(':').map(Number)
    const timeInMinutes = (hour * 60) + minutes;
    return timeInMinutes;
}