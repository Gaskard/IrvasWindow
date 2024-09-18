const forms = () => {
    const form = document.querySelectorAll('form'),
          input = document.querySelectorAll('input'),
          phoneInputs = document.querySelectorAll('input[name="user_phone"]');


          phoneInputs.forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/\D/, '');
            });
        });


    const message = {
        loading: 'Загрузка...',
        success: 'Успешно!!!',
        failure: 'Ошибка',
    }


    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const clearInput = () => {
                input.forEach(item => {
                    item.value = '';
                });
            }

            const postData = async (url, data) => {
                document.querySelector('.status').textContent = message.loading;

                let res = await fetch(url, {
                    method: 'POST',
                    body: data
                });

                return await res.text();
            }

            const formData = new FormData(item);

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInput();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                })

        })
    })
}

export default forms;