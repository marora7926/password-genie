const randomPassword = async (event) => {
  event.preventDefault();
//password variables

const length= document.querySelector('#char_num').value;
const numbers= document.querySelector('#numCheck:checked')!==null;
const symbols= document.querySelector('#symCheck:checked')!==null;
const lowercase= document.querySelector('#smCheck:checked')!==null;
const strict= document.querySelector('#strict:checked')!==null;

  const response = await fetch('/api/password/generating', {
      method: 'POST',
      body: JSON.stringify({ 
          length, 
          numbers, 
          symbols, 
          lowercase, 
          strict }),
      headers: { 'Content-Type': 'application/json' },
    });  
    if (response.ok) {
      //password in response
      const password = (await response.json()).toString();
      const passwordsave = document.querySelector('#passwordsave')
        /*output show*/
      const output = document.querySelector('#password');
        /* final password */
      output.value = password;
      passwordsave.value = output.value;
      return false;
    } else {
      alert(response.statusText);
    };
};
   
/*password generate*/
const generate = async (event) => {
  const pass_num = document.querySelector('#char_num').value;
  if (pass_num >= 8) {
    await randomPassword(event);
  }else{
    alert('Password must have a valid length')
  }
};

/*copy password*/
const copyFunction = (event) => {
  const output = document.querySelector('#password');
    event.preventDefault();
    output.select();
    document.execCommand("copy");
    output.setSelectionRange(0, 99999)
}

document
  .querySelector("#password_generate")
  .addEventListener('click', generate);

document
  .querySelector("#copy")
  .addEventListener('click', copyFunction);  