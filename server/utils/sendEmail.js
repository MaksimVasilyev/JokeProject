const sendEmail = require('./email');

async function main() {
  const options = {
    email: 'vasilevmv1994@rambler.ru',
    subject: 'але ку',
    message: 'Здорово как дела',
  };
  await sendEmail(options);
  console.log('Письмо отправлено!');
}

main();
