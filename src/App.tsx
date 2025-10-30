import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from './components/ui/field'
import { Input } from './components/ui/input'
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group'
import { Button } from './components/ui/button'
import { useMutation } from 'convex/react'
import { api } from '../convex/_generated/api'

function App() {
  const [isComing, setIsComing] = useState<string>()
  const addGuest = useMutation(api.guests.addGuest)
  const [showError, setShowError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              {showSuccess
                ? 'Thank you for your RSVP!'
                : "Clark's 5th Birthday Party!"}
            </CardTitle>
          </CardHeader>
          {!showSuccess && (
            <CardContent>
              <form
                onSubmit={async (e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  const firstName = formData.get('firstName') as string
                  const lastName = formData.get('lastName') as string
                  const isComingValue = formData.get('isComing')
                  if (isComingValue === null) {
                    setShowError(true)
                    return
                  }
                  const isComing = isComingValue === 'yes'
                  const totalKidsValue = formData.get('totalKids') as string
                  const totalKids = totalKidsValue
                    ? Number(totalKidsValue)
                    : undefined
                  addGuest({ firstName, lastName, isComing, totalKids }).then(
                    () => setShowSuccess(true),
                  )
                }}
              >
                <FieldGroup>
                  <FieldSet>
                    <FieldLegend>What is your name?</FieldLegend>
                    <FieldGroup>
                      <div className="grid grid-cols-2 gap-4">
                        <Field>
                          <FieldLabel htmlFor="firstName">
                            First Name
                          </FieldLabel>
                          <Input id="firstName" name="firstName" required />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                          <Input id="lastName" name="lastName" required />
                        </Field>
                      </div>
                      <div>
                        <FieldLegend>Are you coming to the party?</FieldLegend>
                        {showError && (
                          <FieldError>Please select an option</FieldError>
                        )}
                        <RadioGroup
                          onValueChange={(value) => {
                            setIsComing(value)
                            setShowError(false)
                          }}
                          value={isComing}
                          name="isComing"
                        >
                          <Field orientation="horizontal">
                            <RadioGroupItem id="yes" value="yes" />
                            <FieldLabel htmlFor="yes">Yes</FieldLabel>
                          </Field>
                          <Field orientation="horizontal">
                            <RadioGroupItem id="no" value="no" />
                            <FieldLabel htmlFor="no">No</FieldLabel>
                          </Field>
                        </RadioGroup>
                      </div>
                      {isComing === 'yes' && (
                        <div>
                          <FieldLegend>
                            How many kids in your party?
                          </FieldLegend>
                          <Field>
                            <Input
                              name="totalKids"
                              type="number"
                              min={1}
                              max={10}
                              required
                            />
                          </Field>
                        </div>
                      )}
                      <Button type="submit">Submit RSVP</Button>
                    </FieldGroup>
                  </FieldSet>
                </FieldGroup>
              </form>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}

export default App
