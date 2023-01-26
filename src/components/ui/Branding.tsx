import { Flex, IconButton, Link, Text } from '@chakra-ui/react'
import { FractalBrand } from '@decent-org/fractal-ui'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes/routes'
import { FractalLogo } from '../icons/FractalLogo'

export function Branding() {
  const navigate = useNavigate()
  return (
    <Flex
      alignItems={{ starting: 'center', '3xl': 'flex-start' }}
      flexDirection={{ starting: 'row', '3xl': 'column' }}
      h='full'
      justifyContent='space-between'
      px={12}
      pt={{ starting: 0, '3xl': 28 }}
      pb={{ starting: 0, '3xl': 12 }}
    >
      <Flex
        alignItems={{ starting: 'center', '3xl': 'flex-start' }}
        flexDirection={{ starting: 'row', '3xl': 'column' }}
        gap={{ starting: 0, '3xl': '12' }}
        w='full'
      >
        <IconButton
          aria-label='home'
          icon={<FractalLogo width='12rem' height='auto' />}
          onClick={() => navigate(ROUTES.base.relative())}
          variant='unstyled'
        />
        <Flex
          alignItems={{ starting: 'center', '3xl': 'flex-start' }}
          flexDirection='column'
          gap={{ starting: 0, '3xl': '4' }}
          justifyContent={{ starting: 'center', '3xl': 'flex-start' }}
          w='full'
        >
          <Text
            color='gold.500'
            textStyle={{ starting: 'text-2xl-mono-semibold', '3xl': 'text-6xl-mono-semibold' }}
          >
            On - Chain Connect 4
          </Text>
          <Text
            textStyle={{ starting: 'text-base-mono-semibold', '3xl': 'text-2xl-mono-semibold' }}
          >
            POWERED BY{' '}
            <Link
              href='https://www.decent-dao.org/'
              rel='noopener noreferrer'
              target='_blank'
              textDecoration='underline'
            >
              DECENT
            </Link>
          </Text>
        </Flex>
      </Flex>
      <Flex
        justifyContent={{ starting: 'flex-end', '3xl': 'flex-start' }}
        width={{ starting: '12rem', '3xl': 'auto' }}
      >
        <Link href='https://www.fractalframework.xyz/' target='_blank' rel='noopener noreferer'>
          <IconButton
            aria-label='home'
            icon={<FractalBrand boxSize={{ starting: '24', '3xl': '32' }} />}
            variant='unstyled'
          />
        </Link>
      </Flex>
    </Flex>
  )
}
