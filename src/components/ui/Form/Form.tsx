import Button from '../Button';
import Input from '../Input'

const Form = () => {
    return (
        <form>
            <Input type='text' placeholder='Masukkan Nama' className='input w-full md:input-lg'/>
            <Input type='email' placeholder='Masukkan Email' className='input w-full mt-5 md:input-lg'/>
            <textarea className="textarea mt-5 mb-5 w-full md:textarea-lg" placeholder="Masukkan Pesan"></textarea>
            <Button variant='coklat' type='submit'>Kirim Pesan</Button>
        </form>
    )
}

export default Form;