import { Flex, Link, Text } from '@chakra-ui/react'
import { FractalBrand } from '@decent-org/fractal-ui'
import { FractalLogo } from '../icons/FractalLogo'

export function Branding() {
  return (
    <Flex
      flexDirection={{ starting: 'row', '3xl': 'column' }}
      alignItems={{ starting: 'center', '3xl': 'flex-start' }}
      justifyContent='space-between'
      h='full'
      px={12}
      pt={{ starting: 0, '3xl': 28 }}
      pb={{ starting: 0, '3xl': 12 }}
    >
      <Flex
        flexDirection={{ starting: 'row', '3xl': 'column' }}
        alignItems={{ starting: 'center', '3xl': 'flex-start' }}
        gap={{ starting: 0, '3xl': '12' }}
        w='full'
      >
        <FractalLogo width='12rem' height='auto' />
        <Flex
          flexDirection='column'
          alignItems={{ starting: 'center', '3xl': 'flex-start' }}
          w='full'
          justifyContent={{ starting: 'center', '3xl': 'flex-start' }}
          gap={{ starting: 0, '3xl': '4' }}
        >
          <Text textStyle='text-6xl-mono-semibold' color='gold.500'>
            On - Chain Connect 4
          </Text>
          <Text textStyle='text-2xl-mono-semibold'>
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
        width={{ starting: '12rem', '3xl': 'auto' }}
        justifyContent={{ starting: 'flex-end', '3xl': 'flex-start' }}
      >
        <FractalBrand boxSize={{ starting: '24', '3xl': '32' }} />
      </Flex>
    </Flex>
  )
}
