export default function formatDate(dateString: string | Date) {
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) return 'Дата не указана';

  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date).replace(/\s*г\./, '');
};