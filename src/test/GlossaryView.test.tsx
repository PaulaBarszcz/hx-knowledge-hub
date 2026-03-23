import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GlossaryView } from '@/components/GlossaryView'

describe('GlossaryView', () => {
  it('renders the search input', () => {
    render(<GlossaryView />)
    expect(
      screen.getByPlaceholderText('Search terms, definitions...'),
    ).toBeInTheDocument()
  })

  it('renders category filter buttons', () => {
    render(<GlossaryView />)
    expect(screen.getByText('hx Company')).toBeInTheDocument()
    expect(screen.getByText('Insurance Basics')).toBeInTheDocument()
    expect(screen.getByText('Reinsurance')).toBeInTheDocument()
  })

  it('shows total term count', () => {
    render(<GlossaryView />)
    expect(screen.getByText(/of 90 terms/)).toBeInTheDocument()
  })

  it('filters terms when typing in search', async () => {
    const user = userEvent.setup()
    render(<GlossaryView />)

    const input = screen.getByPlaceholderText('Search terms, definitions...')
    await user.type(input, 'reinsurance')

    // Should show reduced count
    expect(screen.queryByText('90 of 90 terms')).not.toBeInTheDocument()
  })

  it('expands a term card on click', async () => {
    const user = userEvent.setup()
    render(<GlossaryView />)

    // Find and click the first term card
    const firstCard = screen.getByText('hyperexponential (hx)')
    await user.click(firstCard)

    // Definition should now be visible
    expect(
      screen.getByText(/London-founded insurtech/),
    ).toBeInTheDocument()
  })

  it('clears search when X button is clicked', async () => {
    const user = userEvent.setup()
    render(<GlossaryView />)

    const input = screen.getByPlaceholderText('Search terms, definitions...')
    await user.type(input, 'test')

    // Click the clear button
    const clearBtn = screen.getByRole('button', { name: '' }) // X button
    await user.click(clearBtn)

    expect(input).toHaveValue('')
  })
})
