import { useForm } from "react-hook-form";

interface InterfaceFormValues {
  storeName: string,
  email: string,
  phoneNumber: number,
  slug:string
  storeType: string
}


export const Form = () => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<InterfaceFormValues>();
  const onSubmit = (data: InterfaceFormValues) => console.log(data);
  console.log(errors);

  const onSlugChange = (e: any) => setValue("slug", e.target.value.toLowerCase().replaceAll(' ', '-'))

  const autoGenerateSlug = () => setValue('slug', watch('storeName').toLowerCase().replaceAll(' ', '-'))

  return (
    <form className="FormSection" onSubmit={handleSubmit(onSubmit)}>
      <label>
          Store Name
      <input type="text" placeholder="Store name" {...register("storeName", {required: true, min: 2, maxLength: 80})} />
      </label>
      <label>
          Slug
      <input type="text" placeholder="Slug" {...register("slug", {required: true, maxLength: 100})} onChange={onSlugChange} />
      </label>
      <button onClick={autoGenerateSlug}>Auto Generate Slug</button>
      <label>
          Email
      <input type="text" placeholder="Email" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
      </label>
      <label>
          Phone Number
      <input type="tel" placeholder="Phone number" {...register("phoneNumber", {required: true, maxLength: 12})} />
      </label>
      <label>
          Store Type
      <select title="Store Type" {...register("storeType", { required: true })}>
        <option value="Taco Shop">Taco Shop</option>
        <option value=" Bar"> Bar</option>
        <option value=" Salon"> Salon</option>
        <option value=" Dark Kitchen"> Dark Kitchen</option>
      </select>
      </label>

      <input type="submit" />
    </form>
  );
}