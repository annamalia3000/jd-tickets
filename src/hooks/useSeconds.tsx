export const useSeconds = (totalSeconds: number) => {
  const totalMinutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor((totalMinutes / 60) % 24);
  const minutes = totalMinutes % 60;

  const formatWord = (value: number, words: [string, string, string]) => {
    const lastDigit = value % 10;
    const lastTwoDigits = value % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return words[2];
    if (lastDigit === 1) return words[0];
    if (lastDigit >= 2 && lastDigit <= 4) return words[1];
    return words[2];
  };

  const hoursText = `${hours} ${formatWord(hours, ['час', 'часа', 'часов'])}`;
  const minutesText = `${minutes} ${formatWord(minutes, ['минута', 'минуты', 'минут'])}`;

  return (
    <>
      {hoursText}
      <br />
      {minutesText}
    </>
  );
};
