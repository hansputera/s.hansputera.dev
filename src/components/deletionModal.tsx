import { Dispatch, SetStateAction, useState } from "react";
import { Form, useForm } from "react-hook-form";

export const DeletionModal: React.FC<{
    dispatch: Dispatch<SetStateAction<boolean>>;
}> = (props) => {
    const [deletionKey, setDeletionKey] = useState('');
    const [deletionMessage, setDeletionMessage] = useState(); 
    const formHook = useForm<{ deletionKey: string }>();

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <Form action={`/api/deletion/${deletionKey}`} method="delete" control={formHook.control} onSuccess={result => {
                setDeletionKey('');
                result.response.json().then(json => {
                    setDeletionMessage(json.message);
                });
            }} onError={result => {
                setDeletionMessage(undefined);
                result.response?.json().then(json => {
                    formHook.setError('deletionKey', {
                        message: json.message,
                    });
                });
            }}>
                <div className="bg-white p-8 rounded-md">
                    <h1 className="text-2xl font-semibold">Deletion Modal</h1>
                    {deletionMessage && (
                        <p className="text-slate-500 mt-2">{deletionMessage}</p>
                    )}
                    <p className="text-gray-600 mt-2">Enter the deletion key to delete the document</p>
                    <input
                        {...formHook.register("deletionKey", {
                            required: "Deletion key is required",
                        })}
                        value={deletionKey}
                        onChange={(e) => {
                            setDeletionKey(e.target.value);
                        }}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 hover:border-blue-500 transition duration-300 ease-in-out mt-2"
                    />
                    {formHook.formState.errors.deletionKey && (
                        <p className="text-red-500 text-sm mt-2">{formHook.formState.errors.deletionKey.message}</p>
                    )}
                    <button disabled={formHook.formState.isLoading} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md">Delete</button>
                    <button disabled={formHook.formState.isLoading} onClick={() => {
                        formHook.reset();
                        setDeletionKey('');
                        props.dispatch(false);
                    }} className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md ml-2">Cancel</button>
                </div>
            </Form>
        </div>
    )
}