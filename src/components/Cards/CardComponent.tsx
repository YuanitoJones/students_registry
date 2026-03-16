import { Button, Card, Field, Input, Stack } from "@chakra-ui/react";
import React, { ReactNode } from "react";

export interface ICardFooter extends Card.FooterProps{
  children:ReactNode
}

export interface ICardBody extends Card.BodyProps{
  children: ReactNode
}
export interface ICardDescription extends Card.DescriptionProps{
    description: string
}
export interface ICardTitle extends Card.TitleProps{
    children?: ReactNode 
}

type ICard = Omit<Card.RootProps, "title"> & {
  title: ICardTitle,
  description?: ICardDescription,
  body?: ICardBody,
  footer?: ICardFooter
  
}
const CardComponent = React.forwardRef<HTMLElement, ICard>(
    function SimpleCard(props, _ref){
      const {title, description, body, footer, ...rest} = props
        return <Card.Root {...rest}>
        <Card.Header>
          <Card.Title {...title}>
            {title.children}
          </Card.Title>

          <Card.Description {...description}>
            {description?.description}
          </Card.Description>
        </Card.Header>
        <Card.Body {...body}>
          {body?.children}
        </Card.Body>
        <Card.Footer {...footer}>
          {footer?.children}
        </Card.Footer>
      </Card.Root>
    }
)

export default CardComponent