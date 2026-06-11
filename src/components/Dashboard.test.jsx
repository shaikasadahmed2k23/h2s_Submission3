import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Dashboard from './Dashboard'

describe('Dashboard component', () => {
  it('displays the carbon score and eco-rank label for a mid-range score', () => {
    render(<Dashboard score={300} tips={['Tip 1', 'Tip 2', 'Tip 3']} onRetake={vi.fn()} />)

    expect(screen.getByText(/300/i)).toBeInTheDocument()
    expect(screen.getByText(/Green Guardian/i)).toBeInTheDocument()
    expect(screen.getByText(/70%/i)).toBeInTheDocument()
  })

  it('renders exactly three AI tips as a list', () => {
    const tips = ['Try local produce.', 'Turn off unused lights.', 'Use reusable bags.']
    render(<Dashboard score={450} tips={tips} onRetake={vi.fn()} />)

    const renderedTips = screen.getAllByRole('listitem')
    expect(renderedTips).toHaveLength(3)
    renderedTips.forEach((tipItem, index) => {
      expect(tipItem.textContent).toContain(tips[index])
    })
  })

  it('shows a carbon offset tip based on the score', () => {
    render(<Dashboard score={450} tips={['A', 'B', 'C']} onRetake={vi.fn()} />)

    expect(screen.getByText(/Plant 9 trees to neutralize your footprint/i)).toBeInTheDocument()
  })

  it('shows a copied confirmation when the share button is clicked', async () => {
    const user = userEvent.setup()
    render(<Dashboard score={300} tips={['Tip 1', 'Tip 2', 'Tip 3']} onRetake={vi.fn()} />)

    await user.click(screen.getByRole('button', { name: /share your village/i }))
    expect(await screen.findByText(/Copied!/i)).toBeInTheDocument()
  })

  it('shows the correct eco-rank label for a high carbon score', () => {
    render(<Dashboard score={850} tips={['A', 'B', 'C']} onRetake={vi.fn()} />)

    expect(screen.getByText(/Pollution Overlord/i)).toBeInTheDocument()
  })

  it('calls onRetake when the retake button is clicked', async () => {
    const onRetake = vi.fn()
    render(<Dashboard score={200} tips={['Tip 1', 'Tip 2', 'Tip 3']} onRetake={onRetake} />)

    await screen.getByRole('button', { name: /retake quiz/i }).click()
    expect(onRetake).toHaveBeenCalledTimes(1)
  })
})
