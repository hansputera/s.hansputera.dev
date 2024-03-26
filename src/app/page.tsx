'use client';

import { type ShortFormInputs } from "@/declarations/shortForm";
import { type DocumentUrl } from "@/declarations/url";
import Link from "next/link";
import { useState } from "react";
import { Form, useForm } from "react-hook-form";

export default function Home() {
  const formHook = useForm<ShortFormInputs>();
  const [shortenedData, setShortenedData] = useState<DocumentUrl>();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-4xl font-sans font-semibold">
          Shortener URL
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Shorten your URL to make it easier to share, and it{"'"}s free!
        </p>

        {shortenedData && (
          <div className="mt-8 bg-gray-200 p-4 rounded-md">
            <p className="text-lg font-semibold text-green-400">
              Your shortened URL is ready!
              </p>
              <Link className="text-blue-500" href={'/'.concat(shortenedData.shortCode)}>
                {window.location.origin}/{shortenedData.shortCode}
              </Link>
            </div>
        )}

        <Form headers={{
          'Content-Type': 'application/json',
        }} action="/api/short" method="post" control={formHook.control} onError={(result) => {
          result.response?.json().then(json => {
            formHook.setError('code', {
              message: json.message,
            });
          });
        }} onSuccess={result => {
          result.response.json().then(json => {
            setShortenedData(json.data);
          });
        }} className="mt-8">
          <input
            {...formHook.register("url", {
              required: "URL is required",
              pattern: {
                value: /^(http|https):\/\/[^ "]+$/,
                message: "Invalid URL format",
              },
            })}
            aria-invalid={formHook.formState.errors.url ? 'true' : 'false'}
            type="text"
            placeholder="Paste your URL here"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 hover:border-blue-500 transition duration-300 ease-in-out"
          />
          {formHook.formState.errors.url && (
            <span className="text-red-500 text-sm mt-1">
              {formHook.formState.errors.url.message}
            </span>
          )}

          <input
            {...formHook.register('code')}
            type="text"
            aria-invalid={formHook.formState.errors.code ? 'true' : 'false'}
            placeholder="Custom code (optional)"
            className="mt-4 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 hover:border-blue-500 transition duration-300 ease-in-out"
          />
          {formHook.formState.errors.code && (
            <span className="text-red-500 text-sm mt-1">
              {formHook.formState.errors.code.message}
            </span>
          )}

          <label className="mt-4 flex items-center">
            <input
              {...formHook.register('sensitive', {
                setValueAs: (value) => Boolean(value),
              })}
              type="checkbox"
              className="mr-2"
            />
            <span className="text-gray-600">Case Sensitive</span>
          </label>

          <button
            disabled={formHook.formState.isSubmitting}
            type="submit"
            onClick={() => setShortenedData(undefined)}
            className="mt-4 bg-blue-500 text-white font-semibold rounded-md px-4 py-2 hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Shorten
          </button>
        </Form>
      </div>
      <span className="font-medium">
        <Link href={'https://s.hansputera.dev'}>
          s.hansputera.dev - Open Source
        </Link>
      </span>
    </main>
  );
}
