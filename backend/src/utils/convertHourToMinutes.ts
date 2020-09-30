export default function convertHourToMinutes(time: string) {
  //8:00
  //dividindo pelo : e convertendo os valores que sobrarem em números
  const [hour, minutes] = time.split(':').map(Number);

  const timeInMinutes = (hour * 60) + minutes;
  
  return timeInMinutes;
};