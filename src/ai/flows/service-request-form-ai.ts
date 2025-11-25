'use server';

/**
 * @fileOverview An AI-powered service request form flow.
 *
 * - serviceRequestFormWithAI - A function that handles the service request form process with AI assistance.
 * - ServiceRequestFormInput - The input type for the serviceRequestFormWithAI function.
 * - ServiceRequestFormOutput - The return type for the serviceRequestFormWithAI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ServiceRequestFormInputSchema = z.object({
  customerName: z.string().describe('The name of the customer requesting the service.'),
  customerContact: z.string().describe('The contact information (phone number or email) of the customer.'),
  pickupLocation: z.string().describe('The full address of the pickup location.'),
  deliveryLocation: z.string().describe('The full address of the delivery location.'),
  itemDescription: z.string().describe('A detailed description of the item to be transported.'),
  weight: z.number().describe('The weight of the item in kilograms.'),
  dimensions: z
    .string()
    .describe('The dimensions of the item in centimeters (length x width x height).'),
  specialInstructions: z
    .string()
    .optional()
    .describe('Any special instructions for handling or transporting the item.'),
});
export type ServiceRequestFormInput = z.infer<typeof ServiceRequestFormInputSchema>;

const ServiceRequestFormOutputSchema = z.object({
  suggestedCompletions: z.object({
    customerName: z.string().optional().describe('Suggested completion for customer name.'),
    customerContact: z.string().optional().describe('Suggested completion for customer contact.'),
    pickupLocation: z.string().optional().describe('Suggested completion for pickup location.'),
    deliveryLocation: z.string().optional().describe('Suggested completion for delivery location.'),
    itemDescription: z.string().optional().describe('Suggested completion for item description.'),
    weight: z.number().optional().describe('Suggested completion for weight.'),
    dimensions: z.string().optional().describe('Suggested completion for dimensions.'),
    specialInstructions: z.string().optional().describe('Suggested completion for special instructions.'),
  }).describe('Suggested form field completions based on the provided input.'),
});
export type ServiceRequestFormOutput = z.infer<typeof ServiceRequestFormOutputSchema>;

export async function serviceRequestFormWithAI(
  input: ServiceRequestFormInput
): Promise<ServiceRequestFormOutput> {
  return serviceRequestFormWithAIFlow(input);
}

const prompt = ai.definePrompt({
  name: 'serviceRequestFormPrompt',
  input: {schema: ServiceRequestFormInputSchema},
  output: {schema: ServiceRequestFormOutputSchema},
  prompt: `You are an AI assistant designed to help users quickly fill out a service request form for EJA Globaltrans, a transport company located in Polígon Industrial Constantí, Tarragona.

  Based on the information provided by the user, suggest completions for the remaining fields in the form. Only provide suggestions based on the information given, do not make assumptions. If some of the fields match information for an existing user, prioritize those to match the existing user info. 

  Consider the following information provided by the user:

  Customer Name: {{{customerName}}}
  Customer Contact: {{{customerContact}}}
  Pickup Location: {{{pickupLocation}}}
  Delivery Location: {{{deliveryLocation}}}
  Item Description: {{{itemDescription}}}
  Weight: {{{weight}}}
  Dimensions: {{{dimensions}}}
  Special Instructions: {{{specialInstructions}}}

  Suggest completions for each of the fields below, leave them blank if you don't have any suggestions:

  Suggested Completions:
  {
    "customerName": <suggestion for customer name>,
    "customerContact": <suggestion for customer contact>,
    "pickupLocation": <suggestion for pickup location>,
    "deliveryLocation": <suggestion for delivery location>,
    "itemDescription": <suggestion for item description>,
    "weight": <suggestion for weight>,
    "dimensions": <suggestion for dimensions>,
    "specialInstructions": <suggestion for special instructions>
  }
  `,
});

const serviceRequestFormWithAIFlow = ai.defineFlow(
  {
    name: 'serviceRequestFormWithAIFlow',
    inputSchema: ServiceRequestFormInputSchema,
    outputSchema: ServiceRequestFormOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
