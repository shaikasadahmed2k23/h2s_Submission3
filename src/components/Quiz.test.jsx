import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Quiz from './Quiz'
import { QUESTIONS } from '../utils/calculator'

describe('Quiz component', () => {
  it('renders the first question and progress header', () => {
    render(<Quiz onComplete={vi.fn()} />)

    expect(screen.getByText(/Question 1 of 10/i)).toBeInTheDocument()
    expect(screen.getByText(QUESTIONS[0].question)).toBeInTheDocument()
    expect(screen.getByRole('radiogroup')).toBeInTheDocument()
  })

  it('allows selecting an answer and enables the Next button', async () => {
    const user = userEvent.setup()
    render(<Quiz onComplete={vi.fn()} />)

    const firstOption = screen.getByRole('radio', {
      name: QUESTIONS[0].options[0].label,
    })
    await user.click(firstOption)

    expect(firstOption).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByRole('button', { name: /next/i })).not.toBeDisabled()
  })

  it('advances to the second question and updates the progress bar', async () => {
    const user = userEvent.setup()
    const { container } = render(<Quiz onComplete={vi.fn()} />)

    await user.click(
      screen.getByRole('radio', { name: QUESTIONS[0].options[0].label }),
    )
    await user.click(screen.getByRole('button', { name: /next/i }))

    expect(screen.getByText(/Question 2 of 10/i)).toBeInTheDocument()
    const progressFill = container.querySelector('div[style*="width: 20%"]')
    expect(progressFill).toBeTruthy()
  })

  it('completes the quiz and calls onComplete with all five answers', async () => {
    const user = userEvent.setup()
    const onComplete = vi.fn()
    render(<Quiz onComplete={onComplete} />)

    for (let index = 0; index < QUESTIONS.length; index += 1) {
      const optionLabel = QUESTIONS[index].options[0].label
      await user.click(screen.getByRole('radio', { name: optionLabel }))
      await user.click(
        screen.getByRole('button', {
          name: index === QUESTIONS.length - 1 ? /see my village/i : /next/i,
        }),
      )
    }

    expect(onComplete).toHaveBeenCalledTimes(1)
    const submittedAnswers = onComplete.mock.calls[0][0]
    expect(Object.keys(submittedAnswers)).toHaveLength(10)
    QUESTIONS.forEach((question) => {
      expect(submittedAnswers[question.id]).toBe(question.options[0].value)
    })
  })
})
