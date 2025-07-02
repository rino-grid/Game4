'use client'

import React, { useState } from 'react'

interface AccordionItemProps {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItemProps[]
}

const AccordionItem: React.FC<AccordionItemProps & { isOpen: boolean; onToggle: () => void }> = ({
  question,
  answer,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="accordion-item" data-state={isOpen ? 'open' : 'closed'}>
      <button className="accordion-trigger" onClick={onToggle}>
        <span>{question}</span>
      </button>
      <div 
        className="accordion-content"
        style={{
          height: isOpen ? 'auto' : '0',
          transition: 'height 0.2s ease'
        }}
      >
        <div className="p-4">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  )
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="accordion-container">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  )
}

export default Accordion