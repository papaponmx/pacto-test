import { useForm } from "react-hook-form";

interface InterfaceFormValues {
  storeName: string,
  email: string,
  phoneNumber: number,
  slug:string
  storeType: string
}


export const Form = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<InterfaceFormValues>();
  const onSubmit = (data: InterfaceFormValues) => console.log(data);
  console.log(errors);

  return (
    <form className="FormSection" onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Store name" {...register("storeName", {required: true, min: 2, maxLength: 80})} />
      <input type="text" placeholder="Slug" {...register("slug", {required: true, maxLength: 100})} />
      <input type="text" placeholder="Email" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
      <input type="tel" placeholder="Mobile number" {...register("phoneNumber", {required: true, maxLength: 12})} />
      <select title="Store Type" {...register("storeType", { required: true })}>
        <option value="Taco Shop">Taco Shop</option>
        <option value=" Bar"> Bar</option>
        <option value=" Salon"> Salon</option>
        <option value=" Dark Kitchen"> Dark Kitchen</option>
      </select>

      <input type="submit" />
    </form>
  );
}